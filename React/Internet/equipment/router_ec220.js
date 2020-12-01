import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '~/pages/_layout';
import { Router } from '~/src/layout/router';
import * as base from '~/src/helpers/basePageFunc';

class RouterPage extends Component {
    static propTypes = {
        city: PropTypes.object,
        hostname: PropTypes.string,
    };

    static async getInitialProps(options) {
        const { hostname } = await base.initialProps(options);
        return { hostname };
    }

    render() {
        const { city, hostname } = this.props;

        return (
            <Layout
                title={`текст ${city.cityIn}`}
                description={`текст ${city.cityIn}`}
                hostname={hostname}
            >
                <Router city={city} />
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    city: state.city.currentCity
});

export default connect(mapStateToProps)(RouterPage);
