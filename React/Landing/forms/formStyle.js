import styled from 'styled-components';
import StyledButton from '@ertelecom/ui-react/components/buttons/styledButton';

export const FormButtonStyled = styled(StyledButton)`
    width: auto;
    min-width: auto;
    margin-top: 35px;
    border-radius: 4px;
    @media(max-width: 400px) {
        width: 100%;
        margin-top: 27px;
    }
`;

export const FormButtonExt = styled(StyledButton)`
    width: auto;
    min-width: auto;
    margin-top: 35px;
    border-radius: 4px;
    margin-right: 20px;
    @media(max-width: 400px) {
        width: 100%;
        margin-top: 27px;
        margin-right: 0;
    }
`;

export const PopupButtonStyled = styled(StyledButton)`
    width: auto;
    margin-top: 30px;
    margin-right: 20px;
    border-radius: 4px;
    @media(max-width: 400px) {
        width: 100%;
        margin-top: 27px;
        margin-right: 0px;
    }
`;

export const FormTitle = styled.div`
    line-height: 28px;
    font-size: 20px;
    margin-bottom: 20px;
`;

export const FormDesc = styled.div`
    line-height: 18px;
    font-size: 14px;
    color: #cccccc;
`;

export const Container = styled.div`
    padding: 50px;
    font-family: 'robotoLight', Arial, Helvetica, sans-serif;
    align-items: baseline;
    @media(max-width: 400px) {
        padding: 40px 20px 20px;
    }
`;


export const PopupTitle = styled.h1`
    line-height: 40px;
    font-size: 32px;
    font-weight: normal;
    margin: 0 0 20px;
    @media(max-width: 400px) {
        line-height: 28px;
        font-size: 20px;
    }
`;

export const RadioLabel = styled.span`
    line-height: 24px;
    font-size: 16px;
`;

export const OldPrice = styled.span`
    line-height: 24px;
    font-size: 14px;
    text-decoration: line-through;
    color: #CECECE;
    padding-left: 10px;
`;

export const PopupText = styled.div`
    line-height: 18px;
    font-size: 14px;
    width: 100%;
    margin-bottom: 20px;
`;

export const PopupTextInfo = styled.div`
    line-height: 18px;
    font-size: 14px;
    color: #CECECE;
    margin-bottom: 20px;
    width: 100%;
`;
