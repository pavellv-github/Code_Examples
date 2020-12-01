import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Layout from '~/pages/_layout';
import Error from '~/pages/_error';
import TariffDetail from '~/src/layout/tariffDetail/bundles';
import Schema from '~/src/components/TariffDetail/schema';
import TariffAPI from '~/src/api/tariffDetail';
import { getTariffs } from '~/src/store/actions/bundles';
import { getCityFromHostName, redirectingInGetInitialProps } from '~/src/helpers/url';
import { getTariffs as getTariffsPackages } from '~/src/api/bundles';
import { getTariffByAlias, getFreePackagesChannels } from '~/src/helpers/tariffDetail';
import * as base from '~/src/helpers/basePageFunc';
import { getPage } from '~/src/api/page';
import { replaceCityVars } from '~/src/helpers/formatter';
import ProductPage from '~/src/components/ProductPages';
import { isCustomTariff } from '~/src/components/ProductPages/helper';
import { getDecoders } from '~/src/api/content-requests/decoder';

const pageModule = 'bundles';

const redirects = {
    interzet: {
        s: 'mega-m',
        l: 'mega-l',
        xxl: 'mega-xl',
        'moy-dom-l': 'village/moy-dom-l',
        'moy-dom-xxl': 'village/moy-dom-xxl',
    },
    perm: {
        l: 'mega-m',
        xxl: 'mega-xl',
    },
    volgograd: {
        s: 'mega-s',
        l: 'mega-m',
        xxl: 'mega-l',
        'sovremennyy-dom-m': 'village/sovremennyy-dom-m',
        'sovremennyy-dom-l-200': 'village/sovremennyy-dom-l-200',
    },
    samara: {
        l: 'mega-m',
        xxl: 'mega-l',
        'schastlivyy-dom-100': 'village/schastlivyy-dom-100',
        'schastlivyy-dom-300': 'village/schastlivyy-dom-300',
    },
    krsk: {
        'sovremennyy-dom-l': 'village/sovremennyy-dom-l',
        'sovremennyy-dom-xxl-600': 'village/sovremennyy-dom-xxl-600',
        'schastlivyy-dom-s': 'village/schastlivyy-dom-s',
        'schastlivyy-dom-m': 'village/schastlivyy-dom-m',
        'dostupnyy-dom-s': 'village/dostupnyy-dom-s',
        'dostupnyy-dom-m': 'village/dostupnyy-dom-m',
    },
    krd: {
        'schastlivyy-dom-s': 'village/schastlivyy-dom-s',
        'schastlivyy-dom-m': 'village/schastlivyy-dom-m',
    },
    rostov: {
        'sovremennyy-dom-m': 'village/sovremennyy-dom-m',
        'sovremennyy-dom-l': 'village/sovremennyy-dom-l',
        'sovremennyy-dom-xl': 'village/sovremennyy-dom-xl',
    },
    lipetsk: {
        'schastlivyy-dom-l': 'village/schastlivyy-dom-l',
        'schastlivyy-dom-xxl': 'village/schastlivyy-dom-xxl',
    },
    angarsk: {
        'sovremennyy-dom-s': 'village/sovremennyy-dom-s',
        'sovremennyy-dom-l': 'village/sovremennyy-dom-l',
        'sovremennyy-dom-xxl': 'village/sovremennyy-dom-xxl',
    },
    barnaul: {
        'sovremennyy-dom-m': 'village/sovremennyy-dom-m',
        'sovremennyy-dom-l': 'village/sovremennyy-dom-l',
        xxl: 'village/xxl',
    },
    bryansk: {
        'sovremennyy-dom-xl': 'village/sovremennyy-dom-xl',
        'sovremennyy-dom-xxl': 'village/sovremennyy-dom-xxl',
    },
    vlz: {
        'sovremennyy-dom-l-200': 'village/sovremennyy-dom-l-200',
        'sovremennyy-dom-m': 'village/sovremennyy-dom-m',
    },
    nsk: {
        s: 'mega-s',
        l: 'mega-m',
        xxl: 'mega-xl',
    },
    voronezh: {
        s: 'mega-s',
        l: 'mega-m',
        xxl: 'mega-l',
        'svoy-dom-100': 'village/svoy-dom-100',
        'svoy-dom-200': 'village/svoy-dom-200',
        'svoy-dom-400': 'village/svoy-dom-400',
    },
    irkutsk: {
        'sovremennyy-dom-s': 'village/sovremennyy-dom-s',
        'sovremennyy-dom-l': 'village/sovremennyy-dom-l',
        'sovremennyy-dom-xxl-200': 'village/sovremennyy-dom-xxl-200',
    },
    yola: {
        'sovremennyy-dom-s': 'village/sovremennyy-dom-s',
        'sovremennyy-dom-l': 'village/sovremennyy-dom-l',
        'sovremennyy-dom-xxl': 'village/sovremennyy-dom-xxl',
    },
    kirov: {
        'sovremennyy-dom-s': 'village/sovremennyy-dom-s',
        'sovremennyy-dom-l': 'village/sovremennyy-dom-l',
        'sovremennyy-dom-xxl-400': 'village/sovremennyy-dom-xxl-400',
    },
    kurgan: {
        'sovremennyy-dom-70': 'village/sovremennyy-dom-70',
        'sovremennyy-dom-150': 'village/sovremennyy-dom-150',
        'sovremennyy-dom-300': 'village/sovremennyy-dom-300',
    },
    mich: {
        'schastlivyy-dom-m': 'village/schastlivyy-dom-m',
        'schastlivyy-dom-l': 'village/schastlivyy-dom-l',
        'schastlivyy-dom-xl': 'village/schastlivyy-dom-xl',
    },
    msk: {
        s: 'village/s',
        m: 'village/m',
    },
    omsk: {
        'sovremennyy-dom-s': 'village/sovremennyy-dom-s',
        'sovremennyy-dom-l': 'village/sovremennyy-dom-l',
        'sovremennyy-dom-xxl': 'village/sovremennyy-dom-xxl',
    },
    oren: {
        'sovremennyy-dom-m': 'village/sovremennyy-dom-m',
        'sovremennyy-dom-l': 'village/sovremennyy-dom-l',
    },
    penza: {
        'moy-dom': 'village/moy-dom',
        'moy-dom-300': 'village/moy-dom-300',
    },
    ryazan: {
        'sovremennyy-dom-xl': 'village/sovremennyy-dom-xl',
        'sovremennyy-dom-l': 'village/sovremennyy-dom-l',
    },
    nn: {
        s: 'mega-s',
        l: 'mega-m',
        xxl: 'mega-l',
    },
    kazan: {
        l: 'mega-m',
        xxl: 'mega-l',
    },
    other: {
        s: 'mega-s',
        l: 'mega-m',
        xxl: 'mega-xl',
        xxl500: 'mega-xl',
        l250: 'mega-l',
        s100: 'mega-s',
    },
};


class BundlesTariffDetail extends React.Component {

    static propTypes = {
        data: PropTypes.object,
    };

    static async getInitialProps(options) {
        let { req, query: { alias }, res, store } = options;
        const relCanonical = get(req, 'headers.host', '');
        let { hostname } = await base.initialProps(options);
        let data = null;

        const city = getCityFromHostName(hostname);

        const state = store.getState();

        if (
            redirects[state.city.currentCity.domain] &&
            redirects[state.city.currentCity.domain][alias]
        ) redirectingInGetInitialProps(res, `/bundles/${redirects[state.city.currentCity.domain][alias]}`);
        else if (
            !redirects[state.city.currentCity.domain] &&
            redirects.other[alias]
        ) redirectingInGetInitialProps(res, `/bundles/${redirects.other[alias]}`);

        let productPageProps = isCustomTariff(alias);
        let { isCustom, productPageAlias } = productPageProps;
        let productPage = null;
        if (isCustom) {
            productPage = await getPage(city, productPageAlias)
                .then(response => {
                    data = {
                        alias
                    };
                    if (response.data && response.data.product) {
                        return replaceCityVars(response.data, state.city.currentCity);
                    } else {
                        isCustom = false;
                        return null;
                    }
                })
                .catch(() => {
                    isCustom = false;
                });
            productPage = { ...productPage, ...productPageProps };
        }

        if (!isCustom) {
            const API = new TariffAPI({
                pageModule,
                alias,
                hostname,
            });

            await API.getInfo('get-bundle').then(async info => {
                if (!info) redirectingInGetInitialProps(res, '/bundles');
                const cityId = state.city.currentCity.cityId;
                const cityDomain = state.city.currentCity.domain;
                store.dispatch(getTariffs(cityId));

                const image = get(info, 'image');
                const tariff_class = get(info, '_class');
                if (tariff_class) {
                    info.image = `/static/images/${pageModule}/${tariff_class}.png`;
                } else if (image) {
                    const imageName = image.replace(/.+-(\w+)\..+/gi, '$1');
                    info.image = `/static/images/${pageModule}/${imageName}.png`;
                }

                const tariffs = await getTariffsPackages(cityId);
                const tariff = getTariffByAlias(alias, tariffs.data);
                const packagesChannel = await API.Request('get-packages-channel', []);
                const additionalServicesData = await API.getAdditionalServices(cityDomain, tariff.sale_package_id);
                const freePackagesChannels = getFreePackagesChannels(packagesChannel, tariff);

                if (info._class === 'xxl' || info.name === ' XXL') {
                    additionalServicesData[0].telearchive = 0;
                }

                const routers = await API.getRouters(cityId);
                const decoders = await getDecoders(cityDomain);

                data = {
                    alias,
                    cityDomain,
                    info,
                    routers,
                    decoders,
                    additionalServicesData: additionalServicesData[0],
                    antivirus: await API.Request('get-antivirus', []),
                    speedup: await API.Request('get-speedup', []),
                    packagesChannel: packagesChannel,
                    phone: await API.Request('get-phone-tariff', []),
                    tariff: tariff,
                    freePackagesChannels: freePackagesChannels
                };
            }).catch(({ message }) => {
                if (message.indexOf('Empty') === 1) res.statusCode = 404;
            });
        }

        return {
            data,
            hostname,
            relCanonical,
            isCustom,
            productPage
        };
    }

    render() {
        if (isEmpty(this.props.data) && this.props.isCustom && isEmpty(this.props.productPage)) return <Error statusCode={404} />;

        const { city, hostname, data, relCanonical, isCustom, productPage, ...props } = this.props;
        const alias = get(data, 'alias');
        const name = get(data, 'info.name');
        const price = get(data, 'info.price', 0);

        let title = `текст`;
        let description = `текст`;

        let canonicalPage = alias === 'igrovoy' ? 'internet' : pageModule;
        let canonicalAlias = city.domain === 'barnaul' ? 'mono-igrovoy' : alias;

        return isCustom ? (
            <ProductPage
                productPage={productPage}
                relCanonical={`://${relCanonical}/${canonicalPage}/${canonicalAlias}`}
                hostname={hostname}
            />
        ) : (
            <Layout
                title={title}
                relCanonical={`://${relCanonical}/${canonicalPage}/${canonicalAlias}`}
                description={description}
                hostname={hostname}
                withMenu={true}
                withHeader={true}
                withFooter={true}
                withChat={true}
                {...props}
            >
                <TariffDetail {...data}/>
                <Schema
                    name={`${name}`}
                    sku={`${pageModule} ${alias}`}
                    url={`${city.domain}`}
                    price={price}
                    image={`${city.domain}${get(data, 'info.image')}`}
                    description={description}
                />
            </Layout>
        );
    }

}

const mapStateToProps = state => ({
    city: state.city.currentCity,
});

const mapDispatchToProps = dispatch => ({
    getTariffs: cityId => dispatch(getTariffs(cityId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BundlesTariffDetail);
