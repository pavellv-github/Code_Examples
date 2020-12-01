import styled from 'styled-components';
import { COLORS } from '../../../assets/js/constants';
import arrow from '../../../assets/img/arrow-grey.svg';


export let CalendarBody = styled.div`
    width: 328px;
    max-width: 328px;
    height: 316px;
    background: ${COLORS.white};
    box-shadow: 0px 4px 10px ${COLORS.grey};
    border-radius: 4px;
    align-items: baseline;
    flex-direction: column;
    position: absolute;
    z-index: +1;
    display: ${props => props.showCalendar ? 'flex' : 'none'};
    top: 48px;
    @media (max-width: 350px) {
        width: 290px;
    }
`;

export let CalendarHeader = styled.div`
    display: flex;
    width: 100%;
    height: 48px;
    border-bottom: 1px solid ${COLORS.grey};
    justify-content: space-between;
    align-items: center;
`;
export let CalendarDayLine = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-bottom: 2px;
`;

export let CalendarArrow = styled.div`
    display: flex;
    width: 35px;
    height: 48px;
    cursor: pointer;
    &::before {
    background: url(${arrow}) center center no-repeat; 
    position: absolute;
    content: ' ';
    width: 12px;
    height: 8px;
    transform: rotate(90deg);
    margin: 18px 0 0 25px;
  }
`;

export let CalendarMonth = styled.div`
    display: flex;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: ${COLORS.black};
`;

export let CalendarDayTitle = styled.div`
    display: flex;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: ${COLORS.darkGrey};
    height: 36px;
    width: 36px;
    justify-content: center;
    align-items: center;
`;

export let CalendarNumber = styled.div`
    display: flex;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: ${props => props.isDisabled ? COLORS.grey : COLORS.black};
    background: ${props => props.isSelected ? `${COLORS.yellow} !important` : COLORS.white};
    border: ${props => props.isNow ? '1px' : '0'} solid ${COLORS.grey};
    border-radius: 50%;
    height: 36px;
    width: 36px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
         background: ${COLORS.outlineGrey};
    }
`;


