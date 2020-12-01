import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../assets/js/constants';

let LabelItem = styled.div`
    font-size: 14px;
    line-height: 18px;
    display: block;
    color: ${ props => props.colorFont ? props.colorFont : COLORS.white };
    background-color: ${ props => props.colorBackground ? props.colorBackground : '#43BBFF' };
    border-radius: ${ props => props.radius ? props.radius : '10px' };
    border: ${ props => props.border ? props.border : '0' };
    height: 20px;
    padding: 0 10px;
    font-family: 'robotoLight';
`;

class Label extends Component {
    render() {
        let { colorFont, colorBackground, radius, className, border,  children } = this.props;
        return (
            <LabelItem className={ className }
                colorFont={ colorFont }
                colorBackground={ colorBackground }
                radius={ radius }
                border={ border }>
                { children }
            </LabelItem>
        );
    }
}

export default Label;
