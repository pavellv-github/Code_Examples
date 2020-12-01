import React, { Component } from 'react';
import styled from 'styled-components';
import FormConnect from './forms/formConnect';
import { connect } from 'react-redux';
import FormNoAuth from './forms/formNoAuth';
import NoSSR from '~/src/helpers/noSSR';

const Footer = styled.div`
    min-height: 928px;
    width: 100%;
    background: ${props => props.background};
    background-size: cover;
    color: #fff;
    display: flex;
    justify-content: space-around;
    font-family: 'robotoLight', Arial, Helvetica, sans-serif;
    flex-wrap: nowrap;
    align-items: center;
    @media(max-width: 600px) {
        flex-direction: column;
        justify-content: center;
        min-height: auto;
        padding-bottom: 50px;
        display: block;
        min-height: auto;
    }
`;

const FooterTitle = styled.h2`
    max-width: 532px;
    line-height: 72px;
    font-size: 60px;
    margin-bottom: 30px;
    @media(max-width: 1500px) {
        font-size: 44px;
        line-height: 56px;
    } 
    @media(max-width: 1200px) {
        width: 100%;
        text-align: center;
    } 
    @media(max-width: 900px) {
        font-size: 32px;
        line-height: 40px;
    } 
`;

const FooterDesc = styled.div`
    max-width: 420px;
    line-height: 28px;
    font-size: 20px;
    margin-bottom: 40px;
    @media(max-width: 1200px) {
        width: 100%;
        text-align: center;
        font-size: 14px;
        line-height: 18px;
    } 
    @media(max-width: 900px) {
        line-height: 16px;
        line-height: 16px;
    }
    @media(max-width: 600px) {
        line-height: 24px;
        font-size: 16px;
        text-align: center;
        max-width: 100%;
    }    
`;

const FooterLeft = styled.div`
    display: flex;
    margin-top: 150px;
    align-items: flex-end;
    width: 55%;
    @media(max-width: 1200px) {
        display: none;
    }
`;


const FooterRight = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 180px; 
    width: 45%; 
    @media(max-width: 1500px) {
        margin-top: 200px; 
    }
    @media(max-width: 1200px) {
        width: auto;
        align-items: center;
        box-sizing: border-box;
    } 
    @media(max-width: 600px) {
        margin: 48px 15px 0;
        align-items: center;
        margin-top: 180px;
        display: block;
    }
    
`;

const FooterImg = styled.img.attrs(({ imageFooterF, imageFooterSmF }) => ({
    srcSet: `${imageFooterSmF} 480w,  ${imageFooterF} 800w`
}))`
    width: 100%;    
`;

const FooterForm = styled.div`
    background: #ffffff;
    width: 460px;
    border-radius: 4px;
    padding: 35px 40px;
    margin-bottom: 30px;
    box-sizing: border-box;
    color: #000000;
    @media(max-width: 600px) {
        width: 100%;
        padding: 20px 20px;
    }
`;

const FooterContact = styled.div`
    padding-left: 25px;
    border-left: 5px solid #ffffff;
    margin-bottom: 30px;
    font-size: 14px;
    line-height: 18px;
    width: 456px;
    white-space: pre-wrap;
    display: block;
    @media(max-width: 600px) {
        width: 100%;
    }
`;

const FooterLink = styled.a`
    color: #fff;
`;

class Index extends Component {

    render() {
        const {
            separator,
            gradientFooterStart,
            gradientFooterEnd,
            footerRotate,
            footerTitle,
            footerDesc,
            isAuth,
            bId,
            city,
            load,
            title,
            images,
            formDesc
        } = this.props;

        let backgroundStyle;

        let imageFooterF = images && images.imageFooter  ? images.imageFooter : null;
        let imageFooterSmF = images && images.imageFooterSm  ? images.imageFooterSm : null;
        let backgroundFooterF = images && images.backgroundFooter  ? images.backgroundFooter : null;

        if (gradientFooterStart && !backgroundFooterF) {
            backgroundStyle = (separator ? `url(${separator}) no-repeat top center, ` : '') +
                `linear-gradient(${footerRotate}, ${gradientFooterStart} 20%, ${gradientFooterEnd} 80%)`;
        } else if (backgroundFooterF) {
            backgroundStyle = (backgroundFooterF ? `url(${backgroundFooterF}) no-repeat top center ` : '');
        }

        return (
            <Footer gradientStart={gradientFooterStart}
                    rotate={footerRotate}
                    gradientEnd={gradientFooterEnd}
                    separator={separator}
                    background={backgroundStyle}
                    id='connect'
                    itemScope itemType='http://schema.org/ImageObject'>
                <FooterLeft>
                    <FooterImg src={imageFooterF} imageFooterF={imageFooterF} imageFooterSmF={imageFooterSmF} itemProp='contentUrl'/>
                </FooterLeft>
                <FooterRight>
                    <FooterTitle itemProp='name'>{footerTitle}</FooterTitle>
                    <FooterDesc itemProp='description'>{footerDesc}</FooterDesc>
                    <FooterForm>
                        <NoSSR>
                            {isAuth ? <FormConnect bId={bId} load={load} title={title}/> : <FormNoAuth formDesc={formDesc}/>}
                        </NoSSR>
                    </FooterForm>
                    <FooterContact>
                        Помощь при покупке. <br/>
                        Позвоните в отдел технической поддержки <br/>
                        по телефону <FooterLink href={`tel:${city.callCenter}`} className='js-calltouch-phone'>{city.callCenter}</FooterLink>.
                    </FooterContact>
                </FooterRight>
            </Footer>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    city: state.city.currentCity,
});


export default connect(
    mapStateToProps,
)(Index);
