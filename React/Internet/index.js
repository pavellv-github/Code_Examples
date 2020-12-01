import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
        let { store } = options;
        let { hostname } = await base.initialProps(options);
        let state = store.getState();
        let domain = state.city.currentCity.domain;
        await store.dispatch(getBannerForInternet(domain));

        const tariffs = store.getState().internet.tariffs;
        const isHasTariffsFromFullBuy = tariffs[0] && Number(tariffs[0].is_self_order) === 1;
        if (!Array.isArray(tariffs) || !tariffs.length || isHasTariffsFromFullBuy) {
            await store.dispatch(getTariffsForInternet(domain));
        }

        let content;
        let parseContent;
        await import(`~/src/components/Internet/${domain === 'interzet' ? 'content_sp.json' : 'content.json'}`).then(resp => {
            content = (resp[domain]) ? resp[domain] : resp.all;
            parseContent = JSON.parse(JSON.stringify(content));
        });

        const pointEntry = await new Promise((resolve, reject) => {
            getContentBlock(domain, 'quiz_game')
                .then(response => resolve(response.data.items))
                .catch(() => reject([]));
        });

        try {
            store.dispatch(requestDataAction([], {}));
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

            if (quiz) requestDataForQuiz(quiz.questions, quizInfo);
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
        const cityText = currentCity.cityIn ? currentCity.cityIn : '';
        const phone = currentCity.phone;
        const link = `://${currentCity.domain}./internet`;
        const title = `текст ${cityText}`;
        const description = `текст ${cityText}`;
        const titleH1 = `текст ${cityText}`;

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
                    isVillage={false}
                    compact={compact}
                />
                <SchemaMicroMarkup tariffs={tariffs} hostname={hostname}/>
            </Layout>
        );
    }

}

InternetPage.propTypes = {
    currentCity: PropTypes.object,
    setCurrentCity: PropTypes.func,
    tariffs: PropTypes.array
};

InternetPage.defaultProps = {
    currentCity: {},
    citiesList: [],
    tariffs: []
};

const mapStateToProps = state => ({
    currentCity: state.city.currentCity,
    tariffs: state.internet.tariffs,
    isAuth: state.auth.isAuth,
    questions: state.quiz.questions,
});

const mapDispatchToProps = dispatch => ({
    getBanner: (domainCity, isAuth) => dispatch(getBannerForInternet(domainCity, isAuth)),
    requestDataForQuiz: (questions, quizInfo) => dispatch(requestDataAction(questions, quizInfo))

});

export default connect(mapStateToProps, mapDispatchToProps)(InternetPage);
