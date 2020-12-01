import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IS_EXPORT_ENV } from '~/src/constants';
import Layout from '~/pages/_layout';
import Mesh from '~/src/layout/mesh';
import { getRouters } from '~/src/api/equipment';
import * as base from '~/src/helpers/basePageFunc';
import Error from '~/pages/_error';

class MeshPage extends Component {
    static propTypes = {
        city: PropTypes.object,
        hostname: PropTypes.string,
    };

    static async getInitialProps(options) {
        let { store } = options;
        let { hostname } = await base.initialProps(options);
        let productList = [];
        let errorCode;
        let currentCity = store.getState().city.currentCity.cityId;
        await getRouters(currentCity, 1).then((res) => {
            if (res) {
                productList = res;
            }
        }).catch(() => {
                errorCode = 404;
            });
        return { hostname, productList, errorCode };
    }

    render() {
        let { city, hostname, productList, errorCode } = this.props;

        let clientHostname = IS_EXPORT_ENV && process.browser ? document.location.hostname : hostname;

        if (errorCode) {
            return <Error statusCode={errorCode}/>;
        }

        return (
            <Layout
                title={`Купить Wi-Fi Mesh-систему от  в ${city.cityIn}, цены на систему Tenda Nova`}
                description={`Официальный сайт  в ${city.cityIn} | Оформите заявку на получение Mesh-системы Nova в рассрочку. Модели и цены на сайте. Оформить заказ: ☎ ${city.callCenter}`}
                hostname={clientHostname}
            >
                <Mesh city={city} productList={productList} />
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.city.currentCity
});

export default connect(mapStateToProps)(MeshPage);
