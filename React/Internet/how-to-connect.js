import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HowToConnect } from '~/src/layout/internet/how-to-connect';
import Layout from '~/pages/_layout';
import { initialProps } from '~/src/helpers/basePageFunc';

HowToConnectPage.getInitialProps = async(options) => {
    let { hostname } = await initialProps(options);
    return { hostname };
};

HowToConnectPage.propTypes = {
    city: PropTypes.object,
    hostname: PropTypes.string,
};


function HowToConnectPage(props) {
    const { city, hostname } = props;
    return (
        <Layout
            title={`Как подключить безлимитный интернет от  в ${city.cityIn} | Cколько стоит провести домашний интернет в квартиру`}
            description={`Провайдер  в ${city.cityIn} предлагает подключить домашний интернет в квартиру. Подробнее о стоимости подключения на сайте или по ☎ ${city.phone}`}
            hostname={hostname}
            withMenu={true}
            withHeader={true}
            withFooter={true}
            withChat={true}
        >
            <HowToConnect city={city.cityIn}/>
        </Layout>
    );
}

const mapStateToProps = (state) => ({
    city: state.city.currentCity
});

export default connect(mapStateToProps)(HowToConnectPage);
