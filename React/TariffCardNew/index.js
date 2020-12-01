import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Wrapper, Body, Description, Head, Options, ButtonBlock, PriceBlock, Price, Button, Tuning, Title, Header, DetailizationLink, PromoIcon, SimpleDetailLink } from './styled';
import TuningTariff from './TuningTariff';
import AdditionalOptions from './AdditionalOptions';
import Option from '~/src/components/TariffCardNew/Option';
import { dataLayerPush } from '@ertelecom/ui-react/components/helpers';
import { cityGetProp, TARIFF_CARD_DETAIL_TEXT } from '~/src/helpers/city';
import { connect } from 'react-redux';
import { isCommonTariff } from '~/src/components/TariffCard/helpers';

const AB_TEST_CITIES = ['irkutsk', 'saratov', 'chel', 'tomsk'];
const AB_TEST_TARIFF = ['mono-igrovoy', 'okko'];
const FULL_BUY_ONLINE = ['ufa', 'ekat', 'kazan'];
export class TariffCardNew extends PureComponent {

    static propTypes = {
        tariff: PropTypes.object,
        cityDomain: PropTypes.string,
        compact: PropTypes.bool,
        onClickButtonHandler: PropTypes.func,
        onClickOnlineHandler: PropTypes.func,
        cardTypeHandler: PropTypes.func,
        textButton: PropTypes.string,
        hideDescription: PropTypes.bool, // не показывать описание тарифа в карточке
        enableDetalization: PropTypes.bool, // не уводить с карточки на детализацию тарифа
        hideAdditionalProducts: PropTypes.bool, // не показывать доп. оборудование
        additionalProductsTitle: PropTypes.string, // зоголовок для дополнительных опций
    };

    state = {
        windowWidth: null
    };

    checkABTest = () => {
        let { city, tariff } = this.props;
        const cities = () => AB_TEST_CITIES.find(item => item == city.domain);
        const tariffs = AB_TEST_TARIFF.find(item => {
            return tariff.alias.indexOf(item) !== -1;
        });
        return !AB_TEST_CITIES.some(cities) || (tariffs != undefined) || tariff.isCottage || (tariff.type == 'bundles');
    }

    render() {

        const { tariff, children, compact, textButton, hideDescription, enableDetalization, hideAdditionalProducts, city, additionalProductsTitle = 'Дополнительно к тарифу' } = this.props;
        const { title, headingColor, description, price, priceActionPeriod, priceAction, saleAction, additionalProductsDesc } = tariff;
        const tariffSettingsUrl = `${tariff.alias === 'constructor' ? '' : tariff.location}/${tariff.alias}`;
        const isPromo = Number(priceAction) > 0;

        const addProducts = tariff.additionalProducts.length
            ?   tariff.additionalProducts.map(p => {
                    const isEquipment = ['router', 'tv'].indexOf(p.product_type) > -1;
                    const type = isEquipment ? 'equipment' : 'internet';

                    return (
                        <Option
                            key={p.id || p.product_id}
                            compact={compact}
                            horizontally={false}
                            typeOptions={type}
                            title={p.product.materialsEnsName || ('ТВ-приставка ' + p.product.mat_name)}
                            image={p.product.mainImage || p.product.image || null}
                        />
                    );
                })
            :   [];

        let detalizationLinkText = 'Подробнее о тарифе';
        if (isCommonTariff(tariff) && cityGetProp(city, TARIFF_CARD_DETAIL_TEXT)) {
            detalizationLinkText = 'Настроить тариф';
        }

        return (
            <Wrapper>
                {
                    compact && isPromo &&
                    <PromoIcon/>
                }
                <Head compact={compact} headingColor={headingColor}>
                    <Header>
                        <Title
                            compact={compact}
                            data-test='title'
                        >
                            {title}
                        </Title>
                    </Header>
                </Head>

                <Body>
                    {
                        !hideDescription &&
                        <Description
                            compact={compact}
                            className='tariff-card-description'
                            data-test='description'
                        >
                            <span dangerouslySetInnerHTML={{ __html: description }}></span>
                            {
                                compact && description && enableDetalization &&
                                <span> <SimpleDetailLink href={tariffSettingsUrl} data-test='tuningTariff'>Подробнее</SimpleDetailLink></span>
                            }
                        </Description>
                    }


                    <Options
                        className='tariff-card-options'
                        data-test='options'
                    >
                        {children}
                    </Options>

                    {
                        !hideAdditionalProducts &&
                        <AdditionalOptions
                            className='tariff-card-add-options'
                            title={additionalProductsTitle}
                            description={additionalProductsDesc}
                            margin={hideDescription}
                            data-test='additional-options'
                        >
                            {
                                addProducts.length > 0 &&
                                <Options>
                                    {addProducts}
                                </Options>
                            }
                            {
                                addProducts.length === 0 &&
                                <Tuning>
                                    <TuningTariff tariff={tariff} />
                                </Tuning>
                            }
                        </AdditionalOptions>
                    }

                    <PriceBlock className='tariff-card-price'>
                        <Price
                            headingColor={headingColor}
                            value={price}
                            valueText='₽/мес'
                            valueAction={priceAction}
                            saleAction={saleAction}
                            valueActionPeriod={priceActionPeriod}
                            data-test='price'
                        />
                    </PriceBlock>
                    <ButtonBlock>
                        <Button
                            text={textButton ? textButton : 'Подключить'}
                            onClick={() => this.onClickHandler(tariff)}
                            className='button-secondary'
                            data-test='connect-btn'
                        />
                        {!compact && enableDetalization && this.checkABTest()
                            ?   <Link href={tariffSettingsUrl} passHref>
                                    <DetailizationLink data-test='tuningTariff'>{detalizationLinkText}</DetailizationLink>
                                </Link>
                            : null
                        }
                    </ButtonBlock>
                </Body>
            </Wrapper>
        );
    }

    goToCart = () => {
        const { compact } = this.props;
        const clickApply = compact ? 'click apply on compact card' : 'click apply on usual card';
        const timestsamp = compact ? new Date().getTime() / 1000 : null;

        dataLayerPush({ event: 'UAevent', category: 'send', action: clickApply, timestsamp });

        const { tariff } = this.props;

        window.location = `/request?productId=${tariff.productId}&productType=${tariff.productType}`;
    };

    onClickHandler = tariff => {
        const { onClickButtonHandler, onClickOnlineHandler, city, isAuth } = this.props;
        if (onClickButtonHandler) {
            onClickButtonHandler(tariff);
            return;
        } else if (tariff.isSelfOrder && FULL_BUY_ONLINE.includes(city.domain) && !isAuth) {
            onClickOnlineHandler(tariff);
        } else {
            this.goToCart();
        }
    }

    componentDidMount() {
        if (process.browser && window.innerWidth <= 1280) {
            this.setState({ windowWidth: window.innerWidth });
        }
    }
}

const mapStateToProps = (state) => ({
    city: state.city.currentCity,
    isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps)(TariffCardNew);
