import styled from 'styled-components';
import { COLORS } from '@ertelecom/ui-react/assets/js/constants';

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 16px 0;
    align-items: center;
    position: relative;
    white-space: normal;
    @media (max-width: 1280px) {
        padding: 12px 0;
    }
`;

export const Text = styled.div`
    display: block;
    font-family: 'robotoLight', Arial, Helvetica, sans-serif;
    line-height: 1.33;
    font-size: 16px;
    font-weight: 300;
    @media (max-width: 1366px) {
        font-size: 14px;
    }
`;

export const SimpleLink = styled.a`
    :hover {
        color: ${COLORS.red}
    }
`;
