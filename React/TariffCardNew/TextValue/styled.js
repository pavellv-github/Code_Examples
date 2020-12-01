import styled from 'styled-components';
import { COLORS, FONTS } from '@ertelecom/ui-react/assets/js/constants';

export const Wrapper = styled.div`
    display: block;
    padding: 12px 0;
    position: relative;
    font-family: 'robotoRegular';
    cursor: auto;
    width: 100%;
    text-decoration-line: none;
    font-size: 14px;
    font-weight: 300;
`;

export const CurrentValue = styled.span`
    color: ${COLORS.black};
    font-weight: 400;
    line-height: 1.33;
    font-size: 20px;
    line-height: 1.1;
    @media (max-width: 1280px) {
        font-size: 16px;
    }
`;

export const OldValue = styled.div`
    display: inline;
    font-size: 14px;
    color: ${COLORS.darkGrey};
    text-decoration: line-through;
`;

export const ActionText = styled.div`
    display: block;
    position: absolute;
    border-radius: 8px;
    padding: 2px 0px 0px;
    font-family: ${FONTS.light}, Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: ${COLORS.darkGrey};
    overflow: hidden;
    top: -12px;
    left: 0;
    @media (max-width: 1600px) {
        font-size: 10px;
    }
    @media (max-width: 1280px) {
        font-size: 8px;
    }
`;
