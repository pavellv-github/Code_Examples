import React,  { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IS_EXPORT_ENV } from '../../../src/constants';
import Layout from '../../_layout';
import Equip from '../../../src/layout/equipment';
import { getRouters } from '../../../src/api/equipment';
import * as base from '../../../src/helpers/basePageFunc';
import contentRequest from '~/src/api/requests/contentRequest';
import { requestDataAction } from '~/src/store/actions/quiz';
import { getBanners } from '~/src/api/banners';

const aliasForQuiz = 'routers';

class EquipmentPage extends Component {
    static propTypes = {
        city: PropTypes.object,
        hostname: PropTypes.string,
    };

    static async getInitialProps(options) {
        let { store } = options;
        let { hostname } = await base.initialProps(options);
        let productList = [];
        let currentCity = store.getState().city.currentCity.cityId;
        const domain = store.getState().city.currentCity.domain;
        await getRouters(currentCity).then((res) => {
            if (res) {
                productList = res;
            }
        }).catch(() => null);

        try {
            store.dispatch(requestDataAction([], {}));

            const quizData = await contentRequest.getWithCache(`${domain}/v1/quiz/view?id=${aliasForQuiz}`);

            const quiz = quizData.data;
            if (quiz) {
                const quizInfo = {
                    alias: quiz.alias,
                    available: quiz.available,
                    available_auth: quiz.available_auth,
                    available_new: quiz.available_new,
                    title: quiz.title
                };

                store.dispatch(requestDataAction(quiz.questions, quizInfo));
            }
        } catch (e) {
 console.log(e);
}

        const banner = await getBanners(domain, false, 'equipmentwifi')
            .then(data => data.data.items[0].bannerInfo)
            .catch(() => null);

        return { hostname, productList, banner };
    }

    async componentDidMount() {
        let { city, questions, requestDataForQuiz } = this.props;

        if (questions.length === 0) {
            const quizData = await contentRequest.getWithCache(`${city.domain}/v1/quiz/view?id=${aliasForQuiz}`);

            const quiz = quizData.data;

            const quizInfo = {
                alias: quiz.alias,
                available: quiz.available,
                available_auth: quiz.available_auth,
                available_new: quiz.available_new
            };

            if (quiz) requestDataForQuiz(quiz.questions, quizInfo);
        }

    }

    render() {
        let { city, hostname, productList, banner } = this.props;
        let clientHostname = IS_EXPORT_ENV && process.browser ? document.location.hostname : hostname;

        return (
            <Layout
                title={`Купить Wi-Fi роутер от  в ${city.cityIn}, цены на оборудование для подключения домашнего интернета`}
                description={`Официальный сайт  в ${city.cityIn}| Оформите заявку на получение Wi-Fi роутера в рассрочку. Модели и цены на сайте. Оформить заказ: ${city.callCenter}`}
                hostname={clientHostname}
                withMenu={true}
                withHeader={true}
                withChat={true}
                withFooter={true}
                relCanonical={`://${hostname}`}
            >
                <Equip city={city} productList={productList} banner={banner} />
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.city.currentCity,
    isAuth: state.auth.isAuth,
    questions: state.quiz.questions,
    quiz: state.quiz.quiz
});

const mapDispatchToProps = (dispatch) => ({
    requestDataForQuiz: (questions, quizInfo) => dispatch(requestDataAction(questions, quizInfo))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EquipmentPage);
