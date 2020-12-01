import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { COLORS } from '../../assets/js/constants';
import themes from './themes.js';

const BREAK = '640px';

let Wrapper = styled.div`
    flex-direction: column;
    width: 100%;
    background: ${props => props.theme.background};
    border: 1px solid ${({ theme }) => theme.border ? theme.border : COLORS.grey};
    border-width: ${props => props.theme.borderWidth};
    border-radius: ${props => props.theme.radius};
    font-family: 'robotoLight';
    padding: ${props => props.theme.padding};
    color: ${({ theme }) => theme.color ? theme.color : COLORS.black};
    @media (max-width: ${BREAK}) {
        padding: ${props => props.theme.mobilePadding};
    }
`;

let AccordionTitle = styled.div`
    font-size: 20px;
    line-height: 1.4em;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    cursor: pointer;
    @media (max-width: ${BREAK}) {
        font-size: 16px;
    }
`;

let Title = styled.div`
    flex-grow: 1;
    width: calc(100% - 53px);
    @media (max-width: ${BREAK}) {
        width: calc(100% - 39px);
    }
`;

let Icon = styled.span`
    position:relative;
    margin-left: 20px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transform: ${props => props.open ? 'scaleY(-1)' : 'none'};
    transition: all 0.2s ease-in;
    svg {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        circle {
            stroke: ${({ borderIcon }) => borderIcon ? borderIcon : COLORS.outlineGrey};
            fill: ${({ backgroundIcon }) => backgroundIcon ? backgroundIcon : COLORS.lightGrey};
        }
        path {
            stroke: ${({ colorArrow }) => colorArrow ? colorArrow : COLORS.darkGrey};
        }
    }
    @media (max-width: ${BREAK}) {
        margin-left: 15px;
        height: 24px;
        width: 24px;
        background-size: contain;
    }
`;

let Border = styled.div`
    height: 1px;
    width: 100%;
    background: ${COLORS.grey};
    margin: 20px 0;
    @media (max-width: ${BREAK}) {
        margin: 15px 0;
    }
`;

let AccordionBody = styled.div`
    width: 100%;
    max-height: ${props => props.open ? '100%' : '0'};
    overflow: hidden;
    transition: max-height 0.2s ${props => props.open ? 'ease-in' : 'ease-out'};
`;

const DEFAULT_THEME = 'bordered';

export default class Accordion extends React.Component {

    static propTypes = {
        defaultOpen: PropTypes.bool,
        open: PropTypes.bool,
        toggle: PropTypes.func,
        customTheme: PropTypes.object
    };

    static defaultProps = {
        defaultOpen: false,
        theme: DEFAULT_THEME,
        customTheme: {},
        toggle: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            open: props.defaultOpen,
        };
    }

    toggle = () => {
        this.props.toggle();
        this.setState(state => ({
            open: !state.open
        }));
    }

    render() {
        let { children, title, open = this.state.open, onOpen = this.toggle, theme, customTheme, ...rest } = this.props;
        let colors = themes[theme] || themes[DEFAULT_THEME];
        if (customTheme) colors = { ...colors, ...customTheme };
        return (
            <ThemeProvider theme={colors}>
                <Wrapper open={open} {...rest}>
                    <AccordionTitle onClick={onOpen}>
                        <Title itemProp='name'>{title}</Title>
                        <Icon open={open} colorArrow={colors.colorArrow} backgroundIcon={colors.backgroundIcon} borderIcon={colors.borderIcon}>
                            <svg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <circle cx='16' cy='16' r='15.5' transform='rotate(90 16 16)' />
                                <path d='M10.5 14L16.1464 19.6464C16.3417 19.8417 16.6583 19.8417 16.8536 19.6464L22.5 14' strokeLinecap='round'/>
                            </svg>
                        </Icon>
                    </AccordionTitle>
                    <AccordionBody open={open} itemScope itemProp='acceptedAnswer' itemType='://schema.org/Answer'>
                        <Border />
                        {children}
                    </AccordionBody>
                </Wrapper>
            </ThemeProvider>
        );
    }
}
