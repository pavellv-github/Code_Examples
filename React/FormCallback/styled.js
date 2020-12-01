import styled from 'styled-components';

export const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    position: relative;
`;

export const Fields = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const Field = styled.div`
    width: ${({ widthWrapper }) => widthWrapper <= 430 ? '100%' : widthWrapper < 666 ? 'calc(50% - 5px)' : 'calc(50% - 10px)'};
`;

export const ButtonBlock = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const FormButton = styled.div`
    width: 188px;
`;

export const FormAgree = styled.div`
    width: calc(100% - 188px);
    padding-left: 21px;
    font-size: 14px;
    color: #979797;
    font-family: 'robotoLight';
    font-weight: 300;
    line-height: 18px;
    a {    
        display: inline-block;
        color: #979797;
        border-bottom: 1px solid #979797;
    }
`;

export const Message = styled.div`
    font-size: 17px;
    color: ${props => props.formState === 'error' ? '#FF2323' : '#00993b'};
    font-family: 'robotoLight';
    padding-top: 10px;
`;
