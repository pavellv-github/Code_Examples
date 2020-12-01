import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../../_layout';
import Detail from '../../../src/layout/equipment/detail';
import contentRequest from '~/src/api/requests/contentRequest';
import { createGlobalStyle } from 'styled-components';
import Error from '~/pages/_error';
import * as base from '../../../src/helpers/basePageFunc';
import { capitalize } from '~/src/helpers/string';

const GlobalStyles = createGlobalStyle`
    body {
        background: #fff;
    }
`;

class DetailPage extends Component {
    static propTypes = {
        city: PropTypes.object,
        hostname: PropTypes.string,
    };

    static async getInitialProps(options) {
        let { store, query, res, asPath } = options;
        let { hostname } = await base.initialProps(options);
        let currentCity = store.getState().city.currentCity.cityId;
        let routerData, errorCode;
        let alias;
        let endpoint;

        if (!(/^\d+$/).test(query.routerId)) {
            alias = query.routerId;
            endpoint = `alias=${alias}`;
        } else {
            endpoint = `materialsEnsId=${query.routerId}`;
        }

        await contentRequest.getWithCache(encodeURI(`v1/city/router-classes?${endpoint}&cityId=${currentCity}`)).then((resp) => {
            if (resp && resp.data) {
                routerData = resp.data[0];
            }
        }).catch(error => {
            error.response.status === 404 ? errorCode = 404 : null;
            res.status(404);
            console.log(error);
            res.redirect(301, '/internet/equipment');
        });

        if (!alias && Boolean(routerData.alias)) {
            res.redirect(301, `${asPath.replace(new RegExp(query.routerId), routerData.alias)}`);
        }

        return {
            hostname,
            query: query,
            routerData: routerData,
            errorCode: errorCode
        };
    }

    render() {
        const { city, hostname, routerData, errorCode } = this.props;

        const color = routerData.color ? `${routerData.color} ` : '';

        if (errorCode) {
            return <Error statusCode={errorCode} />;
        }

        return (
            <Layout
                title={`Купить ${routerData.materialsEnsName} ${color.toLocaleLowerCase()}от  в ${city.cityIn}`}
                description={`${capitalize(color)}${routerData.materialsEnsName} в рассрочку на ${routerData.leasingDuration} месяцев на официальном сайте  в ${city.cityIn}: оформите заявку на получение оборудования на сайте или по ☎ ${city.callCenter}`.trim()}
                relCanonical={`/internet/equipment/${routerData.alias || routerData.materialsEnsId}`}
                hostname={hostname}
                withMenu={true}
                withHeader={true}
                withChat={true}
                withFooter={true}
            >
                <GlobalStyles/>
                <Detail city={city} routerData={routerData} />
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.city.currentCity
});

export default connect(
    mapStateToProps,
)(DetailPage);
