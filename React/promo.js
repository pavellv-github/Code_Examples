import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IS_EXPORT_ENV } from '~/src/constants';
import Layout from './_layout';
import Promo from '../src/layout/promo';
import * as base from '../src/helpers/basePageFunc';

class PromoPage extends Component {
    static propTypes = {
        city: PropTypes.object,
        tariffs: PropTypes.array,
        hostname: PropTypes.string,
        getBanner: PropTypes.func,
        getTariffs: PropTypes.func,
    };

    static async getInitialProps(options) {
        const {
            hostname,
            query: {
                offerId,
                offer_id,
            },
        } = await base.initialProps(options);
        return { hostname, offerId: offerId || offer_id };
    }

    state = {
        hash: '',
    };

    componentDidMount() {
        this.setState({
            hash: window.location.hash,
        });
    }

    render() {
        const { hostname, offerId } = this.props;
        const clientHostname = IS_EXPORT_ENV && process.browser
            ? document.location.hostname
            : hostname;
        return (
            <Layout
                hostname={clientHostname}
                withMenu={true}
                withHeader={true}
                withChat={true}
                title='текст'
                description='текст'
            >
                <Promo
                    hash={this.state.hash}
                    offerId={offerId}
                />
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.city.currentCity,
});

export default connect(mapStateToProps)(PromoPage);
