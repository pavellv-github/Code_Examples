import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { redirectingInGetInitialProps } from '~/src/helpers/url';

import Layout from '~/pages/_layout';
import { getBannerForInternet, getTariffsForInternet } from '~/src/store/actions/internet';
import { requestDataAction, setTariffsForQuizAction } from '~/src/store/actions/quiz';
import contentRequest from '~/src/api/requests/contentRequest';

import Internet from '~/src/components/Internet';
import * as base from '~/src/helpers/basePageFunc';

import SchemaMicroMarkup from '~/src/components/Internet/schema';
import { getContentBlock } from '~/src/api/contentBlock';
import { cityGetProp, COMPACT_TARIFF_CARD } from '~/src/helpers/city';

const aliasForQuiz = 'internet';

const citiesForQuizGame = ['perm', 'samara', 'nn', 'kazan', 'ryazan', 'rostov'];

class InternetPage extends Component {

    static async getInitialProps(options) {
        let { store, res } = options;
        let { hostname } = await base.initialProps(options);
        let state = store.getState();
        let domain = state.city.currentCity.domain;

        await store.dispatch(getBannerForInternet(domain));

        const tariffs = store.getState().internet.tariffs;
        if (!Array.isArray(tariffs) || !tariffs.length) {
            await store.dispatch(getTariffsForInternet(domain));
        }
        // Редирект на /internet если в городе нет тарифов для частного дома
        const villageTariffs = store.getState().internet.tariffs.filter(item => item.is_cottage > 0);
        const hasVillageTariffs = Boolean(villageTariffs && villageTariffs.length);
        if (!hasVillageTariffs) {
            redirectingInGetInitialProps(res, '/internet');
        }

        let content;
        let parseContent;
        await import('~/src/components/Internet/content_mv.json').then(resp => {
            content = (resp[domain]) ? resp[domain] : resp.all;
            parseContent = JSON.parse(JSON.stringify(content));
        });

        const pointEntry = await new Promise((resolve, reject) => {
            getContentBlock(domain, 'quiz_game')
                .then(response => resolve(response.data.items))
                .catch(() => reject([]));
        });

        try {
            const quizData = await contentRequest.getWithCache(`${domain}/v1/quiz/view?id=${aliasForQuiz}`);

            const quiz = quizData.data;
            const quizInfo = {
                alias: quiz.alias,
                available: quiz.available,
                available_auth: quiz.available_auth,
                available_new: quiz.available_new,
                title: quiz.title,
                pointEntry: pointEntry.length ? pointEntry[0] : null
            };

            store.dispatch(requestDataAction(quiz.questions, quizInfo));
            store.dispatch(setTariffsForQuizAction(store.getState().internet.tariffs));

        } catch (e) {
 console.log(e);
}

        // АБ-тест для геймификации квиза
        const isQuizGameDomain = citiesForQuizGame.findIndex(item => item === domain) >= 0;
        const isQuizGame = !!(isQuizGameDomain && Math.random() > 0.5);

        // ab test tariff card
        const compact = cityGetProp(state.city.currentCity, COMPACT_TARIFF_CARD);

        return { hostname, parseContent, isQuizGame, compact };
    }

    async componentDidMount() {
        let {
            currentCity,
            isAuth,
            getBanner,
            questions,
            requestDataForQuiz,
        } = this.props;

        if (process.browser && isAuth) {
            getBanner(currentCity.domain, isAuth);
        }

        if (questions.length === 0) {
            const quizData = await contentRequest.getWithCache(`${currentCity.domain}/v1/quiz/view?id=${aliasForQuiz}`);

            const pointEntry = await new Promise((resolve, reject) => {
                getContentBlock(currentCity.domain, 'quiz_game')
                    .then(response => resolve(response.data.items))
                    .catch(() => reject([]));
            });

            const quiz = quizData.data;

            const quizInfo = {
                alias: quiz.alias,
                available: quiz.available,
                available_auth: quiz.available_auth,
                available_new: quiz.available_new,
                title: quiz.title,
                pointEntry: pointEntry.length ? pointEntry[0] : null
            };

            requestDataForQuiz(quiz.questions, quizInfo);
        }
    }

    componentDidUpdate(prevProps) {
        const { currentCity, isAuth, getBanner } = this.props;
        if (prevProps.isAuth !== this.props.isAuth) {
            getBanner(currentCity.domain, isAuth);
        }
    }

    render() {
        const { currentCity, hostname, parseContent, tariffs, isQuizGame, compact } = this.props;

        const cityText = currentCity.cityIn || '';
        const link = `://${currentCity.domain}`;
        const title = `текст ${cityText}`;
        const description = `текст ${cityText}`;

        let titleH1 = 'текст';

        if (currentCity.domain === 'interzet') {
            titleH1 = `текст ${currentCity.cityIn}`;
        }

        return (
            <Layout
                title={title}
                description={description}
                hostname={hostname}
                withMenu={true}
                withHeader={true}
                withChat={true}
                withFooter={true}
                relCanonical={link}
            >
                <Internet
                    pageContent={parseContent}
                    title={titleH1}
                    city={currentCity.name}
                    isQuizGame={isQuizGame}
                    isVillage={true}
                    compact={compact}
                />
                <SchemaMicroMarkup tariffs={tariffs} hostname={hostname}/>
            </Layout>
        );
    }

}

InternetPage.propTypes = {
    currentCity: PropTypes.object,
    citiesList: PropTypes.array,
    tariffs: PropTypes.array
};

InternetPage.defaultProps = {
    currentCity: {},
    citiesList: [],
    tariffs: []
};

const mapStateToProps = state => ({
    currentCity: state.city.currentCity,
    citiesList: state.city.citiesList,
    tariffs: state.internet.tariffs,
    isAuth: state.auth.isAuth,
    questions: state.quiz.questions,
});

const mapDispatchToProps = dispatch => ({
    getBanner: (domainCity, isAuth) => dispatch(getBannerForInternet(domainCity, isAuth)),
    requestDataForQuiz: (questions, quizInfo) => dispatch(requestDataAction(questions, quizInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(InternetPage);
