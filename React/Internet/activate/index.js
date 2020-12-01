import { COLORS } from '@ertelecom/ui-react/assets/js/constants';
import ErrorPage from '@ertelecom/ui-react/components/layouts/errorPage';
import FormContainer from '@ertelecom/ui-react/components/layouts/formContainer';
import PropTypes from 'prop-types';
import React from 'react';
import NoSSR from '~/src/helpers/noSSR';
import { connect } from 'react-redux';
import ActivationIndex from '../../../src/components/Internet/Activate';

import * as base from '../../../src/helpers/basePageFunc';
import authIcon from '../../../static/images/icons/auth.svg';
import Layout from '../../_layout';
import styled from 'styled-components';

export const Wrap = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: white;
    border: 1px solid ${COLORS.outlineGrey};
    border-radius: 4px;
    width: 100%;
    height: fit-content;
    max-width: 1358px;
    padding: 70px 116px;
    margin: 78px auto;

    @media (max-width: 1920px) {
        max-width: 1032px;
        padding: 50px 88px;
        margin: 40px auto;
    }

    @media (max-width: 1366px) {
        max-width: 1032px;
        padding: 50px 88px;
        margin: 40px auto;
    }

    @media (max-width: 1024px) {
        max-width: 800px;
        padding: 60px 70px;
        margin: 45px auto;
    }

    @media (max-width: 768px) {
        max-width: 590px;
        padding: 50px 76px;
        margin: 120px auto;
    }

    @media (max-width: 320px) {
        max-width: 288px;
        padding: 40px 16px;
        margin: 120px auto;
    }
`;

export const Title = styled.div`
    max-width: 500px;
    font-size: 24px;
    line-height: 28px;
    font-weight: 300;
    margin: 0;
    @media (min-width: 768px) {
        font-size: 32px;
        line-height: 40px;
    }
`;

const Activate = ({
    hostname,
    currentCity,
    isAuth
}) => {
    const cityText = currentCity.cityIn || '';
    const phone = currentCity.phone;
    const link = `://${currentCity.domain}`;

    return (
        <Layout
            title={`Тарифы домашнего безлимитного интернета от  в ${cityText} | Подключить пакеты услуг по выгодной стоимости`}
            description={`Официальный сайт интернет-провайдера  предлагает выбрать тарифный план для безлимитного домашнего интернета в ${cityText} по выгодной стоимости. Тарифы и цены на сайте: ☎️ ${phone}.`}
            hostname={hostname}
            withMenu={true}
            withHeader={true}
            withChat={true}
            withFooter={true}
            relCanonical={link}
        >
            <NoSSR>
                {isAuth ? (
                    <Wrap>
                        <ActivationIndex />
                    </Wrap>
                ) : (
                    <FormContainer maxWidth='1030px'>
                        <ErrorPage
                            title={
                                <Title>
                                    Авторизуйтесь, чтобы активировать тариф
                                </Title>
                            }
                            buttonText='Авторизоваться'
                            buttonLink='/user/login'
                            image={authIcon}
                            showLogo={false}
                            imageWidth='68px'
                            minHeight='auto'
                        />
                    </FormContainer>
                )}
            </NoSSR>
        </Layout>
    );
};

const mapStateToProps = state => ({
    currentCity: state.city.currentCity,
    isAuth: state.auth.isAuth
});

Activate.propTypes = {
    hostname: PropTypes.string,
    currentCity: PropTypes.object,
    products: PropTypes.object,
    isAuth: PropTypes.bool
};

Activate.getInitialProps = async options => {
    const { hostname } = await base.initialProps(options);
    return { hostname };
};

export default connect(mapStateToProps)(Activate);
