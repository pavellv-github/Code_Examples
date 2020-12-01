import styled from 'styled-components';
import eyeOpened from '../../assets/img/icons/eye-opened.svg';
import eyeClosed from '../../assets/img/icons/eye-closed.svg';
import { COLORS } from '../../assets/js/constants';

export const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    flex-direction: column;
    position: relative;
`;

export const StyledInput = styled.input`
    height: 48px;
    width: 100%;
    padding: ${props => props.value || props.isHasMask ? '13px 20px 0 20px' : '0 20px'};
    padding-right: ${props => props.isIconExist ? '50px' : '20px'};
    font: 300 16px "robotoLight";
    border: 1px solid ${props => props.notValid ? COLORS.red : (props.valid ? COLORS.green : COLORS.grey)};
    opacity: ${props => props.pretty ? '0' : '1'};
    border-radius: 4px;
    transition: border 0.2s ease-in;
    outline: none;
    box-shadow: none;
    width: 100%;
    box-sizing: border-box;
    &:focus {
        border-color: ${COLORS.black};
        padding: 13px ${props => props.isIconExist ? '50px' : '20px'} 0 20px;
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
    -webkit-text-security: ${props => props.showText ? 'none' : 'disc'}!important;
`;

export const PlaceholderTop = styled.span`
    white-space: nowrap;
    height: 18px;
    overflow: hidden;
    max-width: ${props => props.isIconExist ? 'calc(100% - 50px)' : 'calc(100% - 20px)'};
    box-sizing: border-box;
    padding: 1px 0 0 20px;
    position: absolute;
    font-size: 13px;
    color: ${COLORS.middleGray};
    opacity: 1;
    transition: 0.2s opacity;
    top: 0;
    line-height: 18px;
    left: 0;
`;

export const PrettyText = styled.div`
    height: 48px;
    padding: 13px 20px 0 20px;
    font: 300 16px "robotoLight";
    border: 1px solid ${COLORS.green};
    border-radius: 4px;
    transition: border 0.2s ease-in;
    outline: none;
    box-shadow: none;
    background: ${COLORS.white};
    align-items: center;
    width: inherit;
    position: absolute;
    box-sizing: border-box;
    top: 0;
`;

export const InputError = styled.p`
    opacity: ${props => props.show ? 1 : 0};
    font-size: ${props => props.show ? '12px' : 0};
    line-height: 2em;
    margin: 0;
    color: ${COLORS.red};
    transition: opacity 0.2s ease-in-out;
`;

export const Eye = styled.div`
    position: absolute;
    background-image: url(${props => props.open ? eyeClosed : eyeOpened});
    background-repeat: no-repeat;
    background-position: 50%;
    top: 0;
    right: 10px;
    width: 48px;
    height: 48px;
    cursor: pointer;
`;
