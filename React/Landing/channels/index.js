import React, { Component } from 'react';
import styled from 'styled-components';
import Carousel from '@ertelecom/ui-react/components/carousel';
import StyledButton from '@ertelecom/ui-react/components/buttons/styledButton';
import ChannelInfo from '../popups/channelInfo';
import { Arrows, ChannelsTabs } from './controls';
import { EPG_FRONT_ENDPOINT } from '~/src/constants';

const Channel = styled.div`
    min-height: 800px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 20px;
    @media(max-width: 600px) {
        min-height: 500px;
    }
`;

const ChannelTitle = styled.div`
    font-size: 44px;
    margin-top: 40px;
    font-family: 'robotoLight', Arial, Helvetica, sans-serif;
    text-align: center;
    max-width: 100%;
    @media(max-width: 1400px) {
        font-size: 32px;
        line-height: 40px;
    }
    @media(max-width: 600px) {
      width: 100%;
    }

`;

const CarouselContainer = styled.div`
    margin-top: ${props => props.isSingleSlide ? '40px' : '120px'};
    justify-content: center;
    max-width: 1186px;
    width: calc(100% - 144px);
    @media(max-width: 1100px) {
      width: calc(100% - 108px);
    }
    @media(max-width: 900px) {
        width: calc(100% - 68px);
    }
    @media (max-width: 460px) {
        width: calc(100% - 28px);
    }
`;

const ChannelSlide = styled.div`
    max-width: 800px;
    margin: 30px auto 0;
    display: block;
    text-align: center;
    @media (max-width: 900px) {
        margin: 0 30px;
    }
    @media (max-width: 460px) {
        margin: 0;
    }
`;

const ChannelDescription = styled.div`
    white-space: normal;
    font-family: 'robotoLight', Arial, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    display: block;
    width: 100%;
    margin-top: 10px;
`;

const ChannelInfoBtn = styled(StyledButton)`
    width: 154px;
    margin-top: 41px;
    @media(max-width: 400px) {
        margin: 41px -30px 0;
        box-sizing: content-box;
    }
`;

const ChannelLogo = styled.img`
    width: 100%;
    height: auto;
    max-width: 588px;
    margin: 20px 0 40px;
    @media(max-width: 400px) {
        margin: 20px 0s 40px;
    }
`;

const ChannelLink = styled.p`
    white-space: normal;
    font-family: 'robotoLight', Arial, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    display: block;
    width: 100%;
`;

const ChannelHref = styled.a`
    white-space: normal;
    font-family: 'robotoLight', Arial, Helvetica, sans-serif;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
`;

class Index extends Component {
    state = {
        tvProgramOpen: false,
        selectedChannel: null
    };

    showTvProgram = (channel) => {
        this.setState({
            selectedChannel: channel,
            tvProgramOpen: !!channel
        });
    }

    render() {
        const { selectedChannel, tvProgramOpen } = this.state;
        const { popupColor, popupTextColor, domain, channels } = this.props;

        const isSingleSlide = channels.length === 1;
        const CustomDots = (props) => <ChannelsTabs channels={channels} {...props} />;

        return (
            <Channel id='channel'>
                <ChannelTitle>
                    {isSingleSlide ? 'Канал, который входит в пакет' : 'Каналы, которые входят в пакет'}
                </ChannelTitle>

                <CarouselContainer isSingleSlide={isSingleSlide}>
                    <Carousel arrows={Arrows} dots={CustomDots} infinite={true}>
                        {
                            channels.map(item => (
                                <ChannelSlide key={item.chid} itemScope itemType='http://schema.org/ImageObject'>
                                    <meta itemProp='name' content={item.title} />
                                    <ChannelLogo src={`${EPG_FRONT_ENDPOINT}${item.biglogo}`} itemProp='contentUrl'/>
                                    <ChannelLink>
                                        Канал:
                                        <ChannelHref href={`://${domain}`} target='_blank' title={item.title}> {item.title}</ChannelHref>
                                    </ChannelLink>
                                    <ChannelDescription dangerouslySetInnerHTML={{ __html: item.description }} itemProp='description'/>
                                    <ChannelInfoBtn text='Подробнее' onClick={() => this.showTvProgram(item)} />
                                </ChannelSlide>
                            ))
                        }
                    </Carousel>
                </CarouselContainer>
                {
                    tvProgramOpen && <ChannelInfo
                        info={selectedChannel}
                        open={tvProgramOpen}
                        popupColor={popupColor}
                        popupTextColor={popupTextColor}
                        close={this.showTvProgram}
                        domain={domain}
                    />
                }
            </Channel>
        );
    }
}

export default Index;
