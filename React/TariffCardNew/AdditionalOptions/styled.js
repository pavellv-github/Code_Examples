import styled from 'styled-components';
import { COLORS, FONTS } from '@ertelecom/ui-react/assets/js/constants';

export const Wrapper = styled.div`
    display: block;
    width: 100%;
    padding: ${ p => p.margin ? '0' : '16px 0 0'};
    position: relative;
    cursor: pointer;
    @media (max-width: 1280px) {
        padding: 12px 0 0;
    }
`;

export const Title = styled.div`
    font-size: 14px;
    text-transform: uppercase;
    color: ${COLORS.black};
    @media (max-width: 1366px) {
        font-size: 12px;
    }
`;

export const Desc = styled.div`
    margin-top: 16px;
    font-family: ${FONTS.regular};
    font-size: 14px;
    color: ${COLORS.black};
    font-weight: 400;
    white-space: normal;
    line-height: 18px;
    @media (max-width: 1366px) {
        font-size: 12px;
    }
`;
