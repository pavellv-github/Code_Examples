import React from 'react';
import PropTypes from 'prop-types';
import Layout from '~/pages/_layout';
import { getPage } from '~/src/api/videocontrol';
import get from 'lodash/get';
import Videocontrol from '~/src/components/Videocontrol';
import { COLORS } from '@ertelecom/ui-react/assets/js/constants';
import { cityGetProp, COMPACT_TARIFF_CARD } from '~/src/helpers/city';
import { initialProps } from '~/src/helpers/basePageFunc';

VideocontrolPage.getInitialProps = async(options) => {
    const { hostname, req, store, query: { type } } = await initialProps(options);
    const relCanonical = get(req, 'headers.host', '');
    const state = store.getState();
    const city = state.city.currentCity;
    const productPage = await getPage(city);
    const compact = cityGetProp(city, COMPACT_TARIFF_CARD);
    return ({
        relCanonical,
        hostname,
        productPage,
        type,
        compact
    });
};

VideocontrolPage.propTypes = {
    relCanonical: PropTypes.string,
    type: PropTypes.string,
    hostname: PropTypes.string,
    productPage: PropTypes.object,
    compact: PropTypes.bool,
};

function VideocontrolPage(props) {
    const { hostname, relCanonical, productPage, type, compact } = props;
    return (
        <Layout
            title={productPage.meta_title}
            relCanonical={`://${relCanonical}`}
            description={productPage.meta_description}
            hostname={hostname}
            withMenu={true}
            withHeader={true}
            withFooter={true}
            withChat={true}
            page='videocontrol'
            bgColor={COLORS.lightGrey}
        >
            <Videocontrol type={type} compact={compact} features={productPage.features} />
        </Layout>
    );
}

VideocontrolPage.defaultProps = {
    productPage: {},
    type: '',
    hostname: '',
    relCanonical: '',
    compact: true,
};

export default VideocontrolPage;
