import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '~/pages/_layout';
import * as base from '~/src/helpers/basePageFunc';
import Wifi from '~/src/layout/wifi';
import { fetchWifiList } from '~/src/store/actions/wifi';

class WifiPage extends Component {
    static propTypes = {
        city: PropTypes.object,
        hostname: PropTypes.string,
    }

    static defaultProps = {
        city: {},
        hostname: '',
    }

    static async getInitialProps(options) {
        const { store } = options;
        const { hostname } = await base.initialProps(options);
        const { city } = store.getState();
        await store.dispatch(fetchWifiList(city.currentCity.domain));
        return { city, hostname };
    }

    render() {
        const { city, hostname } = this.props;
        const { cityIn, domain } = city.currentCity;
        const clientHostname = process.browser ? document.location.hostname : hostname;

        return (
            <Layout
                title={`Бесплатный городской Wi-Fi интернет в ${cityIn} | Безлимитный доступ в интернет для клиентов `}
                description={`Официальный сайт интернет-провайдера  в ${cityIn} | Воспользуйтесь бесплатным городским Wi-Fi. Более 9000 точек в 36 регионах России. Посмотрите все точки доступа на сайте.`}
                hostname={clientHostname}
                withMenu={true}
                withHeader={true}
                withChat={true}
                withFooter={true}
                relCanonical={`://${domain}`}
            >
                <Wifi />
            </Layout>
        );
    }
}

export default connect()(WifiPage);
