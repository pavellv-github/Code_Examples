import React, { Component } from 'react';
import styled from 'styled-components';

import StyledButton from '@ertelecom/ui-react/components/buttons/styledButton';

import logo from '../../../static/images/.svg';

const Header = styled.div`
    width: 100%;
    height: 100vh;
    min-height: 980px;
    background: ${props => props.background};
    background-size: cover;
    color:#fff;
    display: flex;
    justify-content: space-around;
    font-family: 'robotoLight', Arial, Helvetica, sans-serif;
    flex-wrap: nowrap;
    align-items: start;
    position: relative;
    @media(max-width: 1919px) {
        min-height: 940px;
    }
    @media(max-width: 1440px) {
        min-height: 800px;
    }
    @media(max-width: 1365px) {
        min-height: 780px;
    }
    @media(max-width: 1080px) {
        min-height: 670px;
        max-height: 685px;
    }
    @media(max-width: 767px) {
        flex-direction: column;
        justify-content: start;
        align-items: center;
        min-height: 670px;
        max-height: none;
        height: auto;
        padding-bottom: 150px;
        display: block;
    }

    &::before {
        background-size: cover;
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: ${props => props.layer_cover};
        z-index: 6;

        @media(max-width: 600px) {
            position: static;
            bottom: -1px;
        }

        @media(max-width: 767px) {
            position: static;
        }
    }

    &::after {
        content: "";
        display: block;
        width: 103%;
        height: 100%;
        position: absolute;
        bottom: -2px;
        left: -4px;
        background: ${props => props.layer};
        background-size: 100%;
        z-index: 7;

        @media(min-width: 1921px) {
            bottom: -4px;
        }

        @media(max-width: 600px) {
            bottom: -1px;
        }
    }
`;

const HeaderTitle = styled.h1`
    margin-top:55px;
    margin-bottom:0;
    font-size:60px;
    @media(max-width: 1600px) {
        line-height: 72px;
        font-size: 60px;
        margin-bottom: 0;
    }
    @media(max-width: 1150px) {
        margin-top: 40px;
    }
    @media(max-width: 900px) {
        font-size: 44px;
        line-height: 48px;
        margin-top: 50px;
    }
    @media(max-width: 767px) {
        line-height: 40px;
        font-size: 32px;
        width: auto;
        max-width: 100%;
        text-align: center;
    }
`;

const HeaderDesc = styled.div`
    font-size: 20px;
    max-width: 500px;
    margin-top: 50px;
    line-height: 28px;
    @media(max-width: 1150px) {
        margin-top: 40px;
    }
    @media(max-width: 900px) {
        line-height: 24px;
        font-size: 16px;
        margin-top: 30px;
    }
    @media(max-width: 767px) {
        line-height: 24px;
        font-size: 16px;
        margin-top: 35px;
        text-align: center;
        width: auto;
        max-width: 100%;
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    width: 45%;
    flex-direction: column;
    margin-top:150px;
    margin-left:160px;
    z-index: 9;
    @media(max-width: 1365px) {
        margin-top: 100px;
        margin-left: 125px;
    }
    @media(max-width: 1150px) {
        margin-top: 72px;
        margin-left: 100px;
    }
    @media(max-width: 900px) {
        margin-top: 50px;
        margin-left: 85px;
    }
    @media(max-width: 767px) {
        margin: 48px 15px 0;
        align-items: center;
        width: auto;
        max-width: 100%;
    }
`;

const HeaderLogoLink = styled.a.attrs({
    href: '/'
})``;

const HeaderLogo = styled.img.attrs({
    src: logo
})`
    width:75px;
`;

const HeaderRight = styled.div`
    display: flex;
    width: 55%;
    z-index: 1;
    align-items: center;
    justify-content: center;
    z-index: 9;
    margin-top: 100px;

    @media(max-width: 1366px) {
        margin-top: 110px;
    }
    @media(max-width: 767px) {
        margin-top: 10px;
        width: auto;
        height: auto;
        max-width: 100%;
    }
`;

const HeaderImg = styled.img.attrs(({ imageHeaderF, imageHeaderSmF }) => ({
    srcSet: `${imageHeaderSmF} 480w,  ${imageHeaderF} 800w`
}))`
    width: 100%;
`;

const LinkButtonStyled = styled(StyledButton)`
    width: 150px;
    margin-top: 50px;
    z-index: 8;
    @media(max-width: 1600px) {
        margin-bottom: 280px;
    }
    @media(max-width: 1150px) {
        margin-bottom: 200px;
    }
    @media(max-width: 900px) {
        margin-bottom: 50px;
    }
    @media(max-width: 600px) {
        width: 100%;
        margin-top: 30px;
        margin-bottom: 0;
    }
`;

class Index extends Component {

    handleClick = () => {
        document.querySelector('#connect').scrollIntoView({ block: 'start', behavior: 'smooth' });
    };

    render() {
        const {
            gradient,
            separator,
            title,
            desc,
            images
        } = this.props;
        let backgroundStyle;

        let imageHeaderF = images && images.image ? images.image : null;
        let imageHeaderSmF = images && images.imageSm ? images.imageSm : null;
        let backgroundHeaderF = images && images.headerBackground ? images.headerBackground : null;
        let layerHeader = images && images.layerHeader ? images.layerHeader : null;
        let layerCover = images && images.layerCover ? images.layerCover : null;

        if (gradient && !backgroundHeaderF) {
            backgroundStyle = (separator ? `url(${separator}) no-repeat bottom center, ` : '') +
              `linear-gradient(${gradient})`;
        } else if (backgroundHeaderF) {
            backgroundStyle = (backgroundHeaderF ? `url(${backgroundHeaderF}) no-repeat bottom center ` : '');
        }

        let layerHeaderImages = (layerHeader ? `url(${layerHeader}) no-repeat bottom center ` : '');
        let layerHeaderCover = (layerCover ? `url(${layerCover}) no-repeat top left ` : '');

        return (
            <Header background={backgroundStyle} layer={layerHeaderImages} layer_cover={layerHeaderCover} id='title' itemScope itemType='http://schema.org/ImageObject'>
                <HeaderLeft>
                    <HeaderLogoLink>
                        <HeaderLogo />
                    </HeaderLogoLink>
                    <HeaderTitle itemProp='name'>{title}</HeaderTitle>
                    <HeaderDesc itemProp='description' dangerouslySetInnerHTML={{ __html: desc }} />
                    <LinkButtonStyled type='primary' text='Подключить' onClick={this.handleClick} />
                </HeaderLeft>
                <HeaderRight>
                    <HeaderImg src={imageHeaderF}  imageHeaderSmF={imageHeaderSmF} imageHeaderF={imageHeaderF} itemProp='contentUrl'/>
                </HeaderRight>
            </Header>
        );
    }
}

export default Index;
