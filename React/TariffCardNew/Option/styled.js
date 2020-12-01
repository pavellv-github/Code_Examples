import styled from 'styled-components';
import { COLORS } from '@ertelecom/ui-react/assets/js/constants';

export const Wrapper = styled.div`
    display: flex;
    padding: 10px 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    margin-left: 0;
    &:first-child {
        margin-left: 0;
    }
    @media (max-width: 1280px) {
        padding: ${p => p.isHavePromoPeriod ? '5px 0 14px' : '5px 0'};
    }
`;

export const TitleBlock = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    ${p => p.horizontally ? 'margin-right: 8px;' : ''}
`;

export const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    &:before {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${p => p.headingColor ? p.headingColor : 'transparent'};
        opacity: 0.2;
    }
    svg {
        display: block;
        position: absolute;
        width: 30px;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
    }
    path {
      fill: ${({ headingColor }) => headingColor};
    }
    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
    @media (max-width: 1280px) {
        width: 42px;
        height: 42px;
        svg {
            width: 24px;
        }
    }
`;

export const Title = styled.div`
    display: block;
    padding: ${p => p.compact ? '0' : '0 0 0 16px'};
    font-size: 16px;
    font-family: 'robotoRegular', Arial, Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.33;
    color: ${COLORS.black};
    max-width: ${p => p.value ? '220px' : 'none'};
    white-space: normal;
    @media (max-width: 1280px) {
        font-size: 14px;
        padding: ${p => p.compact ? '0' : '0 0 0 8px'};
        width: calc(100% - 42px);
    }
`;

export const ValueBlock = styled.div`
    display: block;
`;
