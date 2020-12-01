import styled from 'styled-components';
import { COLORS } from '@ertelecom/ui-react/assets/js/constants';

export const Wrapper = styled.div`
    display: block;
    padding: 0;
    position: relative;
`;

export const ActionText = styled.div`
    display: block;
    position: absolute;
    border-radius: 8px;
    font-family: 'robotoRegular', Arial, Helvetica, sans-serif;
    padding: 2px 0 3px;
    font-weight: 400;
    font-size: 10px;
    line-height: 1.33;
    color: ${COLORS.darkGrey};
    overflow: hidden;
    bottom: -18px;
    right: 0;
    white-space: nowrap;
    &:before {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;

export const BlockValue = styled.div`
    display: flex;
    justify-content: ${({ labelBottom }) => labelBottom ? 'flex-start' : 'flex-end'};
    align-items: flex-end;
    font-family: 'robotoRegular', Arial, Helvetica, sans-serif;
    font-weight: 400;
    line-height: 1.33;
    flex-wrap: nowrap;
`;

export const CurrentValue = styled.div`
    display: block;
    font-size: 20px;
    line-height: 1.1;
    color: ${({ type }) => (type === 'quantityChannels' || type === 'equipment') ? COLORS.blue : COLORS.black};
    cursor: ${({ type }) => (type === 'quantityChannels' || type === 'equipment') ? 'pointer' : 'auto'};
    width: 100%;
    &:hover {
        color: ${COLORS.red};
    }
    span {
        text-decoration-line: ${({ type }) => (type === 'quantityChannels' || type === 'equipment') ? 'underline' : 'none'};
        font-size: ${({ type }) => type === 'equipment' ? '16px' : '14px'};
    }
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

export const Description = styled.div`
    display: block;
    position: absolute;
    top: calc(100% + 5px);
    right: -100px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    font-size: 16px;
    color: ${COLORS.white};
    background: #515B60;
    border-radius: 4px;
    font-family: 'robotoRegular', Arial, Helvetica, sans-serif;
    width: 396px;
    padding: 20px;
    z-index: 2;
    line-height: 1.4;
    transition: 0.5s;
    pointer-events: ${p => p.isHover ? 'auto' : 'none'};
    opacity: ${p => p.isHover ? '1' : '0'};
    white-space: normal;
    &:after {
        display: block;
        content: '';
        position: absolute;
        right: 120px;
        top: -5px;
        width: 10px;
        height: 10px;
        background: #515B60;
        margin: 0 auto;
        transform: rotate(45deg);
    }
    @media (max-width: 920px) {
        right: -50px;
        &:after {
            right: 70px;
        }
    }
    @media(max-width: 680px) {
        right: 0;
        &:after {
            right: 20px;
        }
    }
    @media(max-width: 550px) {
        font-size: 14px;
        width: 300px;
        padding: 15px;
    }
    @media(max-width: 410px) {
        width: 270px;
        padding: 15px 10px;
    }
    @media(max-width: 380px) {
        width: 230px;
    }
`;
