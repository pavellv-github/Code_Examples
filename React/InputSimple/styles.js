import styled from 'styled-components';
import { COLORS, FONTS } from '../../assets/js/constants';

export const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    flex-direction: column;
`;

export const Input = styled.input`
    height: 48px;
    width: 100%;
    padding: ${p => p.value ? '13px 20px 0 20px' : '0 20px'};
    font: 300 16px ${FONTS.light};
    border: 1px solid ${p => p.isNotValid ? COLORS.red : (p.isValid ? COLORS.green : COLORS.grey)};
    border-radius: 4px;
    transition: border 0.2s ease-in;
    outline: none;
    box-shadow: none;
    width: 100%;
    box-sizing: border-box;
    &:focus {
        border-color: ${COLORS.black};
        padding: 13px 20px 0 20px;
    }
    &:disabled {
      border-color: ${COLORS.grey};
      background-color: ${COLORS.outlineGrey};
    }
    &::placeholder,
    &:-ms-input-placeholder,
    &::-ms-input-placeholder {
        color: ${COLORS.darkGrey};
        opacity: 1;
    }
    &::-ms-clear,
    &::-ms-reveal,
    &:focus::-ms-clear, ::-ms-reveal {
        display: none !important;
    }
    &[type=number]::-webkit-inner-spin-button,
    &[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    -webkit-text-security: ${p => p.showText ? 'none' : 'disc'}!important;
`;

export const PlaceholderTop = styled.span`
    display: block;
    white-space: nowrap;
    height: 18px;
    overflow: hidden;
    max-width: calc(100% - 20px);
    box-sizing: border-box;
    padding: 1px 0 0 20px;
    position: absolute;
    font-size: 13px;
    color: ${COLORS.middleGray};
    opacity: 1;
    transition: 0.2s opacity;
    top: 0;
    line-height: 18px;
`;

export const InputError = styled.p`
    display: block;
    font-size: 12px;
    line-height: 2em;
    margin: 0;
    color: ${COLORS.red};
    transition: opacity 0.2s ease-in-out;
`;
