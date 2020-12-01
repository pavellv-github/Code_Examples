import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Layout from '~/pages/_layout';
import Error from '~/pages/_error';
import TariffAPI from '~/src/api/tariffDetail';
import { getCityFromHostName, redirectingInGetInitialProps } from '~/src/helpers/url';
import { getTariffs as getTariffsPackages } from '~/src/api/internet';
import { getTariffByAlias } from '~/src/helpers/tariffDetail';
import * as base from '~/src/helpers/basePageFunc';
import Presentation from '~/src/components/Presentation';
import { COLORS } from '@ertelecom/ui-react/assets/js/constants';
import { productPageInternet as productPage } from '~/data/product-page-data-for-village-tariffs';
import { infoBottomText } from '~/src/components/Presentation/elements/infoBottonText';
import { setRouters } from '~/src/store/actions/routers';
import { setProductDataAction, setCheckListAction } from '~/src/store/actions/village-detail';
import { formationInternetCheck } from '~/src/components/Request/helpers/internetRequest';

const pageModule = 'internet';

class InternetTariffsDetail extends React.Component {

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

        await API.getInfo('get-tariff').then(async info => {
            if (!info) redirectingInGetInitialProps(res, '/internet');
            const city = getCityFromHostName(hostname);
            const state = store.getState();
            const cityId = state.city.currentCity.cityId;
            const domainCity = state.city.currentCity.domain;
            let image = get(info, 'image');
            if (image) {
                info.image = `://${city}.${image}`;
            }

            const tariffsData = await getTariffsPackages(domainCity, false);
            const tariffs = tariffsData.data.items;
            const tariff = getTariffByAlias(alias, tariffs);

            productPage.product = {
                ...tariff
            };

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
            store.dispatch(setCheckListAction(formationInternetCheck(tariff, initialCheckList)));


            const routers = await API.getRouters(cityId);
            store.dispatch(setRouters(routers));

            data = {
                alias,
                info,
                routers,
                antivirus: await API.Request('get-antivirus-for-tariff', []),
                speedup: await API.Request('get-speedup', []),
                tariff
            };
        }).catch(({ message }) => {
            console.log(message);
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

        const { city, hostname, data, relCanonical, productPage, ...props } = this.props;
        const cityText = city.cityIn;
        const alias = get(data, 'alias');
        const name = get(data, 'info.name');
        const speed = get(data, 'info.speed', 0);

        let title = `текст ${name}`;
        let description = `текст ${name}`;

        const defaultBgColor = 'COLORS.white';
        const defaultTextColor = COLORS.black;

        return (
            <Layout
                title={title}
                description={description}
                hostname={hostname}
                relCanonical={`://${relCanonical}/${pageModule}/${alias}`}
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
});

export default connect(
    mapStateToProps,
)(InternetTariffsDetail);
