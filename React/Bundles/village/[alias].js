import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Layout from '~/pages/_layout';
import Error from '~/pages/_error';
import TariffAPI from '~/src/api/tariffDetail';
import { getTariffs } from '~/src/store/actions/bundles';
import { redirectingInGetInitialProps } from '~/src/helpers/url';
import { getTariffs as getTariffsPackages } from '~/src/api/bundles';
import { getTariffByAlias, getFreePackagesChannels, filterTvEquimpents } from '~/src/helpers/tariffDetail';
import * as base from '~/src/helpers/basePageFunc';
import Presentation from '~/src/components/Presentation';
import { productPageBundles as productPage } from '~/data/product-page-data-for-village-tariffs';
import { COLORS } from '@ertelecom/ui-react/assets/js/constants';
import { formationBundleCheck } from '~/src/components/Request/helpers/bundlesRequest';
import { setProductDataAction, setCheckListAction } from '~/src/store/actions/village-detail';
import { setRouters } from '~/src/store/actions/routers';
import { setTvBoxes } from '~/src/store/actions/tvboxes';
import contentRequest from '@ertelecom/ui-react/components/requests/contentRequest';
import { infoBottomText } from '~/src/components/Presentation/elements/infoBottonText';

const pageModule = 'bundles';

class BundlesTariffDetail extends React.Component {

    static propTypes = {
        data: PropTypes.object,
    };

    static async getInitialProps(options) {
        let { req, query: { alias }, res, store } = options;
        const relCanonical = get(req, 'headers.host', '');
        let { hostname } = await base.initialProps(options);
        let data = null;

        const API = new TariffAPI({
            pageModule,
            alias,
            hostname,
        });

        await API.getInfo('get-bundle').then(async info => {
            if (!info) redirectingInGetInitialProps(res, '/bundles');
            const state = store.getState();
            const isAuth = state.auth.isAuth;
            const cityId = state.city.currentCity.cityId;
            const cityDomain = state.city.currentCity.domain;
            store.dispatch(getTariffs(cityId));

            const image = get(info, 'image');
            const tariff_class = get(info, 'title_class');
            if (tariff_class) {
                info.image = `/static/images/${pageModule}/${tariff_class}.png`;
            } else if (image) {
                const imageName = image.replace(/.+-(\w+)\..+/gi, '$1');
                info.image = `/static/images/${pageModule}/${imageName}.png`;
            }

            const tariffs = await getTariffsPackages(cityId);
            const tariff = getTariffByAlias(alias, tariffs.data);
            const packagesChannel = await API.Request('get-packages-channel', []);

            const product = {
                ...tariff,
                features: productPage.product.features
            };
            productPage.product = product;


            store.dispatch(setProductDataAction(productPage));

            const initialCheckList = {
                monthly: {
                    total: 0,
                    list: []
                },
                once: {
                    total: 0,
                    list: []
                }
            };
            store.dispatch(setCheckListAction(formationBundleCheck(tariff, initialCheckList, isAuth)));

            const additionalServicesData = await API.getAdditionalServices(cityDomain, tariff.sale_package_id);

            const freePackagesChannels = getFreePackagesChannels(packagesChannel, tariff);

            const tvEquipmentsFromApi = await API.getTvEquipments(cityDomain, tariff.sale_package_id);

            if (info.title_class === 'xxl' || info.name === ' XXL') additionalServicesData[0].telearchive = 0;

            const routers = await API.getRouters(cityId);
            store.dispatch(setRouters(routers));

            await contentRequest(`${cityDomain}/v1/decoder?filter[available_site]=1`)
                .then(response => {
                    store.dispatch(setTvBoxes(response.data.items));
})
                .catch(e => console.log(e));

            data = {
                alias,
                info,
                routers: await API.getRouters(cityId),
                additionalServicesData: additionalServicesData[0],
                antivirus: await API.Request('get-antivirus', []),
                speedup: await API.Request('get-speedup', []),
                tvEquipment: await API.Request('get-tv-equipment', []),
                tvEquipmentsFromApi: filterTvEquimpents(tvEquipmentsFromApi),
                packagesChannel: packagesChannel,
                phone: await API.Request('get-phone-tariff', []),
                tariff: tariff,
                freePackagesChannels: freePackagesChannels
            };
        }).catch(({ message }) => {
            if (message.indexOf('Empty') === 1) res.statusCode = 404;
        });

        return {
            data,
            hostname,
            relCanonical,
            productPage
        };
    }

    render() {
        if (isEmpty(this.props.data)) return <Error statusCode={404} />;

        const { city, hostname, data, relCanonical, productPage, isAuth, ...props } = this.props;
        const cityText = city.cityIn;
        const alias = get(data, 'alias');
        const name = get(data, 'info.name');

        const title = `текст`;
        const description = `текст`;

        const defaultBgColor = 'COLORS.white';
        const defaultTextColor = COLORS.black;

        return (
            <Layout
                title={title}
                relCanonical={`://${relCanonical}/${pageModule}/${alias}`}
                description={description}
                hostname={hostname}
                withMenu={true}
                withHeader={true}
                withFooter={true}
                withChat={true}
                headMinified
                {...props}
            >
                <Presentation
                    bgColor={productPage.bg_color || defaultBgColor}
                    productPage={productPage}
                    textColor={productPage.text_color || defaultTextColor}
                    typeImage={'image'}
                    isEquipments
                    isCheckList
                    isAuth={isAuth}
                    headerBgColor='#56B873'
                    headerTextColor={COLORS.white}
                    textBottomForm={infoBottomText}
                />
            </Layout>
        );
    }

}

const mapStateToProps = state => ({
    city: state.city.currentCity,
    isAuth: state.auth.isAuth,
});

const mapDispatchToProps = dispatch => ({
    getTariffs: cityId => dispatch(getTariffs(cityId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BundlesTariffDetail);
