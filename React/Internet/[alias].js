import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Layout from '~/pages/_layout';
import Error from '~/pages/_error';
import TariffDetail from '~/src/layout/tariffDetail/internet';
import Schema from '~/src/components/TariffDetail/schema';
import TariffAPI from '~/src/api/tariffDetail';
import { getCityFromHostName, redirectingInGetInitialProps } from '~/src/helpers/url';
import { getTariffs as getTariffsPackages } from '~/src/api/internet';
import { getTariffByAlias } from '~/src/helpers/tariffDetail';
import * as base from '~/src/helpers/basePageFunc';
import { setRouters } from '~/src/store/actions/routers';
import { getPage } from '~/src/api/page';
import { replaceCityVars } from '~/src/helpers/formatter';
import ProductPage from '~/src/components/ProductPages';
import { isCustomTariff, isValidProductPage } from '~/src/components/ProductPages/helper';

const pageModule = 'internet';

const redirects = {
    interzet: {
        s: 'mega-m',
        l: 'mega-l',
        xxl: 'mega-xl',
        'moy-dom-xxl': 'mono-village/moy-dom-xxl',
        'moy-dom-l': 'mono-village/moy-dom-l',
    },
    perm: {
        l: 'mega-m',
        xxl: 'mega-xl',
    },
    volgograd: {
        s: 'mega-s',
        l: 'mega-m',
        xxl: 'mega-l',
        'tvoy-dom-m': 'mono-village/tvoy-dom-m',
        'tvoy-dom-l-200': 'mono-village/tvoy-dom-l-200',
    },
    samara: {
        l: 'mega-m',
        xxl: 'mega-l',
        'schastlivyy-dom-100-mono': 'mono-village/schastlivyy-dom-100-mono',
        'schastlivyy-dom-300-mono': 'mono-village/schastlivyy-dom-300-mono',
    },
    krsk: {
        'skorostnoy-dom-100': 'mono-village/skorostnoy-dom-100',
        'skorostnoy-dom-400': 'mono-village/skorostnoy-dom-400',
    },
    krd: {
        'dostupnyy-dom-s': 'mono-village/dostupnyy-dom-s',
        'dostupnyy-dom-m': 'mono-village/dostupnyy-dom-m',
    },
    rostov: {
        'tvoy-dom-m': 'mono-village/tvoy-dom-m',
        'tvoy-dom-l': 'mono-village/tvoy-dom-l',
        'skorostnoy-dom-xl': 'mono-village/skorostnoy-dom-xl',
    },
    lipetsk: {
        'sovremennyy-dom-l': 'mono-village/sovremennyy-dom-l',
        'sovremennyy-dom-xxl': 'mono-village/sovremennyy-dom-xxl',
    },
    angarsk: {
        'tvoy-dom-s': 'mono-village/tvoy-dom-s',
        'tvoy-dom-l': 'mono-village/tvoy-dom-l',
        'tvoy-dom-xxl': 'mono-village/tvoy-dom-xxl',
    },
    barnaul: {
        'skorostnoy-dom-70': 'mono-village/skorostnoy-dom-70',
        'skorostnoy-dom-100': 'mono-village/skorostnoy-dom-100',
        'skorostnoy-dom-300': 'mono-village/skorostnoy-dom-300',
    },
    vlz: {
        'sovremennyy-dom-l-200': 'mono-village/tvoy-dom-l-200',
    },
    nsk: {
        one: 'mega-s',
        two: 'mega-m',
        three: 'mega-xl',
    },
    voronezh: {
        s: 'mega-s',
        l: 'mega-m',
        xxl: 'mega-l',
        'tvoy-dom-100': 'mono-village/tvoy-dom-100',
        'tvoy-dom-200': 'mono-village/tvoy-dom-200',
        'tvoy-dom-400': 'mono-village/tvoy-dom-400',
    },
    ekat: {
        'sovremennyy-dom-100': 'mono-village/sovremennyy-dom-100',
        'sovremennyy-dom-400': 'mono-village/sovremennyy-dom-400',
    },
    irkutsk: {
        'sovremennyy-dom-s': 'mono-village/sovremennyy-dom-s',
        'sovremennyy-dom-l': 'mono-village/sovremennyy-dom-l',
        'sovremennyy-dom-xxl-200-mono': 'mono-village/sovremennyy-dom-xxl-200-mono',
    },
    yola: {
        'sovremennyy-dom-s-mono': 'mono-village/sovremennyy-dom-s-mono',
        'sovremennyy-dom-l-mono': 'mono-village/sovremennyy-dom-l-mono',
        'sovremennyy-dom-xxl-mono': 'mono-village/sovremennyy-dom-xxl-mono',
    },
    kirov: {
        'tvoy-dom-50': 'mono-village/tvoy-dom-50',
        'tvoy-dom-200': 'mono-village/tvoy-dom-200',
        'tvoy-dom-400': 'mono-village/tvoy-dom-400',
    },
    kurgan: {
        'tvoy-dom-70': 'mono-village/tvoy-dom-70',
        'tvoy-dom-150': 'mono-village/tvoy-dom-150',
        'tvoy-dom-300': 'mono-village/tvoy-dom-300',
    },
    mich: {
        'sovremennyy-dom-m': 'mono-village/sovremennyy-dom-m',
        'sovremennyy-dom-l': 'mono-village/sovremennyy-dom-l',
        'sovremennyy-dom-xl': 'mono-village/sovremennyy-dom-xl',
    },
    omsk: {
        'tvoy-dom-s': 'mono-village/tvoy-dom-s',
        'tvoy-dom-l': 'mono-village/tvoy-dom-l',
        'tvoy-dom-xxl': 'mono-village/tvoy-dom-xxl',
    },
    penza: {
        'moy-dom-mono': 'mono-village/moy-dom-mono',
        'moy-dom-mono-300': 'mono-village/moy-dom-mono-300',
    },
    ryazan: {
        'sovremennyy-dom-l': 'mono-village/sovremennyy-dom-l',
        'sovremennyy-dom-xl': 'mono-village/sovremennyy-dom-xl',
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
        'internet-l-250': 'mega-l',
        'internet-xxl-500': 'mega-xl',
        'internet-s-100': 'mega-s',
    },
};

class InternetTariffsDetail extends React.Component {

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
        ) redirectingInGetInitialProps(res, `/internet/${redirects[state.city.currentCity.domain][alias]}`);
        else if (
            !redirects[state.city.currentCity.domain] &&
            redirects.other[alias]
        ) redirectingInGetInitialProps(res, `/internet/${redirects.other[alias]}`);

        let productPageProps = isCustomTariff(alias);
        let { isCustom, productPageAlias } = productPageProps;
        let productPage = null;
        if (isCustom) {
            productPage = await getPage(city, productPageAlias)
                .then(response => {
                    data = {
                        alias
                    };
                    if (isValidProductPage(response.data)) {
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

            await API.getInfo('get-tariff').then(async info => {
                if (!info) redirectingInGetInitialProps(res, '/internet');
                const city = getCityFromHostName(hostname);
                const cityId = state.city.currentCity.cityId;
                const domainCity = state.city.currentCity.domain;
                let image = get(info, 'image');
                if (image) {
                    info.image = `://${city}.${image}`;
                }

                const tariffsData = await getTariffsPackages(domainCity, false);
                const tariffs = tariffsData.data.items;
                const tariff = getTariffByAlias(alias, tariffs);

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
        }

        return {
            data,
            hostname,
            relCanonical,
            isCustom,
            productPage,
        };
    }

    render() {
        if (isEmpty(this.props.data) && this.props.isCustom && isEmpty(this.props.productPage)) {
            return <Error statusCode={404} />;
        }

        const { city, hostname, data, relCanonical, isCustom, productPage, ...props } = this.props;
        const cityText = city.cityIn;
        const alias = get(data, 'alias');
        const name = get(data, 'info.name');
        const price = get(data, 'info.price', 0);
        const speed = get(data, 'info.speed', 0);
        const tariff = get(data, 'tariff');

        let title = `текст ${cityText}`;
        let description = `текст ${name}`;

        return isCustom ? (
            <ProductPage
                productPage={productPage}
                relCanonical={`://${relCanonical}/${pageModule}/${alias}`}
                hostname={hostname}
            />
        ) : (
            <Layout
                title={title}
                description={description}
                hostname={hostname}
                relCanonical={`://${relCanonical}/${pageModule}/${alias}`}
                withMenu={true}
                withHeader={true}
                withFooter={true}
                withChat={true}
                {...props}
            >
            <>
                <TariffDetail tariff={tariff} {...data}/>
                <Schema
                    name={`Тариф интернета ${name}`}
                    sku={`${pageModule} ${alias}`}
                    url={`://${city.domain}./${pageModule}/${alias}`}
                    price={price}
                    image={get(data, 'info.image')}
                    description={description}
                />
            </>
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
