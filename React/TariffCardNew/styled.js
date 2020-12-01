import styled from 'styled-components';
import TextValue from './TextValue';
import { COLORS } from '@ertelecom/ui-react/assets/js/constants';
import StyledButton from '@ertelecom/ui-react/components/buttons/styledButton';

const Content = styled.div`
    padding-left: 34px;
    padding-right: 34px;
    @media(max-width: 1366px) {
        padding-left: 20px;
        padding-right: 20px;
    }
    @media(max-width: 1024px) {
        padding-left: 34px;
        padding-right: 34px;
    }
    @media (max-width: 768px) {
        padding-left: 24px;
        padding-right: 24px;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    position: relative;
    overflow:hidden;
    border-radius: 6px;
    border: 1px solid ${COLORS.outlineGrey};
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0);
    width: 100%;
    margin: 0 auto 20px;
    flex-direction: column;
    transition: 0.3s;
    &:hover {
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.07);
    }
`;

export const PromoIcon = styled.div`
    position: absolute;
    top: 0;
    right: 30px;
    width: 32px;
    height: 32px;
    background: url(/static/images/icons/promo-tariff.svg) no-repeat center;
    @media(max-width: 1279px) {
        right: 11px;
    }
    @media (max-width: 530px) {
        right: 12px;
    }
`;

export const Head = styled(Content)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: ${p => p.compact ? '34px' : '10px'};
    padding-bottom: ${p => p.compact ? '8px' : '18px'};
    width: 100%;
    margin-bottom: ${p => p.compact ? '0' : '-8px'};
    background-color: ${({ headingColor, compact }) => compact ? COLORS.white : headingColor};
    color: ${({ headingColor, compact }) => compact ? headingColor : COLORS.white};
`;

export const Header = styled.div`
    display: block;
    width: 100%;
    white-space: normal;
`;

export const Title = styled.div`
    display: block;
    line-height: 1.33;
    font-family: 'robotoRegular';
    font-size: ${p => p.compact ? '16px' : '20px'};
    @media(max-width: 1366px) {
        font-size: ${p => p.compact ? '16px' : '16px'};
    }
`;

export const Body = styled(Content)`
    display:block;
    background-color: ${COLORS.white};
    width: 100%;
`;

export const Description = styled.div`
    display: block;
    width: 100%;
    padding: ${p => p.compact ? '0' : '20px 0'};;
    font-family: 'robotoLight';
    color: ${COLORS.black};
    line-height: 1.33;
    white-space: normal;
    flex-wrap: wrap;
    font-size: ${p => p.compact ? '16px' : '20px'};
    @media(max-width: 1366px) {
        font-size: ${p => p.compact ? '16px' : '16px'};
    }
`;

export const Options = styled.div`
    display:flex;
    width: 100%;
    padding: 15px 0;
    flex-direction: column;
`;

export const Tuning = styled.div``;

export const ButtonBlock = styled.div`
    padding: 12px 0 24px;
    text-align: center;
`;

export const Button = styled(StyledButton)`
    width: 100%;
    padding: 10px 15px;
    margin-bottom: 8px;
    font-size: 14px;
    @media (min-width: 1024px) and (max-width: 1279px) {
        padding: 10px;
    }
`;

export const SimpleDetailLink = styled.a`
    :hover {
        color: ${COLORS.red};
    }
`;
export const DetailizationLink = styled.a`
    padding: 8px 0;
    width: 100%;
    font-size: 14px;
    color: ${COLORS.darkGrey};
    text-decoration: underline;
    cursor: pointer;
    :hover {
        color: ${COLORS.red};
    }
`;

export const PriceBlock = styled.div`
    display:block;
`;

export const Price = styled(TextValue)`
    margin-top: 0;
    white-space: pre-wrap;
    line-height: 1.3;
`;
