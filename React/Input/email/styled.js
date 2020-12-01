import styled from 'styled-components';
import { COLORS } from '../../../assets/js/constants';

export const AutoCompleteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: nowrap;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: auto;
    max-height: 240%;
    overflow-y: auto;
    overflow-x: hidden;
    background: ${COLORS.white};
    border: solid 1px ${COLORS.grey};
    visibility: ${props => (props.show ? 'visible' : 'hidden')};
    z-index: 10;
`;

export const AutoCompleteItem = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-shrink: 0;
    width: 100%;
    height: 30px;
    padding: 8px 13px;
    cursor: pointer;
    background: ${props => (props.focused ? COLORS.lightYellow : COLORS.white)};

    &:hover {
        background: ${props => !props.focused && COLORS.lightGrey};
    }
`;
