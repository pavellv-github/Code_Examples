import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '~/pages/_layout';
import Bundles from '~/src/layout/bundles';
import { getBanner, getTariffs } from '~/src/store/actions/bundles';
import { requestDataAction, setTariffsForQuizAction } from '~/src/store/actions/quiz';
import { getTariffsSelector } from '~/src/store/selectors/bundles';
import * as base from '~/src/helpers/basePageFunc';
import contentRequest from '~/src/api/requests/contentRequest';
import { cityGetProp, COMPACT_TARIFF_CARD } from '~/src/helpers/city';

const aliasForQuiz = 'bundles';

class BundlesPage extends Component {
    static propTypes = {
        city: PropTypes.object,
        tariffs: PropTypes.array,
        hostname: PropTypes.string,
        getBanner: PropTypes.func,
        getTariffs: PropTypes.func,
        isAuth: PropTypes.bool
    };

    state = {
        pageContent: this.props.parseContent,
    };

    static async getInitialProps(options) {
        let { store } = options;
        let { hostname } = await base.initialProps(options);
        let state = store.getState();
        let city = state.city.currentCity;

        await store.dispatch(getBanner(city.domain));

        const tariffs = getTariffsSelector(state);
        const isHasTariffsFromFullBuy = tariffs[0] && ((tariffs[0].salePackage2in1 && Number(tariffs[0].salePackage2in1.is_self_order) === 1) || (tariffs[0].salePackage3in1 && Number(tariffs[0].salePackage3in1.is_self_order) === 1));
        if (!Array.isArray(tariffs) || !tariffs.length || isHasTariffsFromFullBuy) {
            await store.dispatch(getTariffs(city.cityId));
        }

        let parseContent;
        let content;
        let domain = state.city.currentCity.domain;

        await import('~/src/components/Bundles/Content/content.json').then(resp => {
            content = (resp[domain]) ? resp[domain] : resp.all;
            parseContent = JSON.parse(JSON.stringify(content));
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
                title: quiz.title
            };

            store.dispatch(requestDataAction(quiz.questions, quizInfo));
            const tariffs = getTariffsSelector(store.getState());
            store.dispatch(setTariffsForQuizAction(tariffs));
            await store.dispatch(getBanner(domain, false, 'bundles'));

            await import('~/src/components/Bundles/Content/content.json').then(resp => {
                content = (resp[domain]) ? resp[domain] : resp.all;
                parseContent = JSON.parse(JSON.stringify(content));
            });

        } catch (e) {
            console.log(e);
        }

        const compact = cityGetProp(city, COMPACT_TARIFF_CARD);

        return { hostname, parseContent, compact };
    }

    async componentDidMount() {

        const {
            city,
            isAuth,
            getTariffs,
            getBanner,
            setTariffsForQuiz,
            tariffs,
            quizTariffs,
            questions,
            requestDataForQuiz,
            banner
        } = this.props;

        if (process.browser && isAuth) {
            getTariffs(city.cityId, isAuth);
            getBanner(city.domain, isAuth, 'bundles');
        }

        if (quizTariffs.length === 0) {
            setTariffsForQuiz(tariffs);
        }

        if (questions.length === 0) {
            const quizData = await contentRequest.getWithCache(`${city.domain}/v1/quiz/view?id=${aliasForQuiz}`);

            const quiz = quizData.data;

            const quizInfo = {
                alias: quiz.alias,
                available: quiz.available,
                available_auth: quiz.available_auth,
                available_new: quiz.available_new
            };

            if (quiz.questions && quiz.questions.length) {
                requestDataForQuiz(quiz.questions, quizInfo);
            }
        }

        if (!banner) {
            getBanner(city.domain, isAuth, 'bundles');
        }
    }

    componentDidUpdate(prevProps) {
        let { city, getBanner, getTariffs, isAuth, tariffs, quizTariffs, setTariffsForQuiz } = this.props;
        if (JSON.stringify(city) !== JSON.stringify(prevProps.city)) {
            getBanner(city.domain, isAuth, 'bundles');
            getTariffs(city.cityId);
        }

        if (prevProps.isAuth !== isAuth) {
            getTariffs(city.cityId, isAuth);
            getBanner(city.domain, isAuth, 'bundles');
        }

        if (quizTariffs.length !== tariffs.length) {
            setTariffsForQuiz(tariffs);
        }
    }

    render() {
        let { city, hostname, tariffs, compact } = this.props;
        let { pageContent } = this.state;

        let cityText = city.cityIn;
        let { phone } = city;
        const link = `://${city.domain}`;
        const title = `текст`;
        const description = `текст`;
        const titleH1 = 'текст';
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
                <Bundles tariffs={tariffs} title={titleH1} pageContent={pageContent} isVillage={false} compact={compact} />
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.city.currentCity,
    tariffs: getTariffsSelector(state),
    isAuth: state.auth.isAuth,
    quizTariffs: state.quiz.tariffs,
    questions: state.quiz.questions,
    banner: state.bundles.banner
});

const mapDispatchToProps = (dispatch) => ({
    getTariffs: (cityId, isAuth) => dispatch(getTariffs(cityId, isAuth)),
    setTariffsForQuiz: tariffs => dispatch(setTariffsForQuizAction(tariffs)),
    getBanner: (domainCity, isAuth) => dispatch(getBanner(domainCity, isAuth)),
    requestDataForQuiz: (questions, quizInfo) => dispatch(requestDataAction(questions, quizInfo))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BundlesPage);
