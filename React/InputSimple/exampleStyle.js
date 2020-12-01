import styled from 'styled-components';
import { COLORS, FONTS } from '../../assets/js/constants';

export const Container = styled.div`
    display: block;
    width: calc(100% - 20px);
    margin: 20px auto;
    max-width: 1170px;
`;

export const Wrapper = styled.div`
    display: block;
    width: 100%;
    max-width: 300px;
`;

export const Title = styled.div`
    display: block;
    margin: 20px auto;
    font-family: ${FONTS.regular};
    color: ${COLORS.black};
    font-size: 26px;
`;

export const Description = styled.div`
    display: block;
    margin: 20px auto;
    font-family: ${FONTS.light};
    color: ${COLORS.black};
    font-size: 20px;
`;
