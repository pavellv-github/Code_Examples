import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import arrowImage from '../../../assets/img/arrow.svg';
import { COLORS } from '@ertelecom/ui-react/assets/js/constants';

const ArrowsContainer = styled.div`
    position: absolute;
    justify-content: space-between;
    top: calc(50% - 30px);
    width: calc(100% + 144px);
    left: -72px;
    @media(max-width: 1100px) {
        left: -54px;
        width: calc(100% + 108px);
    }
    @media(max-width: 900px) {
        top: 25%;
        left: -34px;
        width: calc(100% + 68px);
    }
`;

const ChannelNav = styled.div`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 1px solid #E5E5E5;
    background: url(${arrowImage}) center center no-repeat;
    background-size: 20%;
    transform: ${props => props.left ? 'rotate(180deg)' : 'rotate(0deg)'};
    cursor: pointer;
    transition: all 500ms ease 0s;
    &:hover {
        box-shadow: 0px 0px 25px rgba(11, 45, 86, 0.1)
    }
    @media(max-width: 1100px) {
        width: 54px;
        height: 54px;
    }
    @media(max-width: 900px) {
        width: 34px;
        height: 34px;
    }
`;

const Arrows = (props) => {
    let { swipeLeft, swipeRight } = props;
    return (
        <ArrowsContainer>
            <ChannelNav left={true} onClick={swipeLeft} />
            <ChannelNav onClick={swipeRight} />
        </ArrowsContainer>
    );
};

const Tabs = styled.div`
    position: absolute;
    width: 100%;
    top: -80px;
    overflow: hidden;
    border-bottom: 1px solid ${COLORS.grey};
`;

const TabsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: ${props => props.justify ? 'space-between' : 'flex-start'};
    position: relative;
    flex-wrap: nowrap;
    white-space: nowrap;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-${props => props.translateX}px);
`;

const Tab = styled.div`
    display: inline-block;
    padding: 20px 0;
    white-space: nowrap;
    cursor: pointer;
    font-family: ${props => props.active ? 'robotoRegular' : 'robotoLight'};
    &:hover {
        color: ${props => props.active ? '#000' : COLORS.red}
    }
    &:not(:last-child) {
        margin-right: 30px;
    }
`;

const Bar = styled.div`
    position: absolute;
    height: 3px;
    background-color: ${COLORS.red};
    width: ${props => props.width}px;
    left: ${props => props.left}px;
    transition: width 0.4s ease-in-out, left 0.4s ease-in-out;
    bottom: -1px;
    z-index: 1;
`;

const SLIDES_TO_JUSTIFY = 4;
const NEXT_SLIDE_OFFSET = 60;

class ChannelsTabs extends React.Component {
    render() {
        let { active, onClick, channels } = this.props;
        let count = channels.length;

        let tabs = channels.map((channel, i) => <Tab key={i} active={i === active} onClick={() => onClick(i)}>{channel.title}</Tab>);

        let tabsRef = this.refs.tabs;
        let barWidth = 0, barLeft = 0, translateX = 0;

        if (tabsRef) {
            let tabsNode = ReactDOM.findDOMNode(tabsRef);
            let tabsWidth = tabsNode.clientWidth;
            let activeTab = tabsNode.children[active + 1];
            barWidth = activeTab.clientWidth || 0;
            barLeft = activeTab.offsetLeft || 0;

            let offset = barWidth - (tabsWidth - barLeft);
            if (active < count - 1) {
                // если не последний показать краешек следующего
                offset += NEXT_SLIDE_OFFSET;
            }
            if (offset > 0) {
                translateX = offset;
            }
        }

        return (
            <Tabs>
                <TabsContainer ref='tabs' translateX={translateX} justify={count > SLIDES_TO_JUSTIFY}>
                    <Bar width={barWidth} left={barLeft}/>
                    {tabs}
                </TabsContainer>
            </Tabs>
        );
    }
}

export { Arrows, ChannelsTabs };
