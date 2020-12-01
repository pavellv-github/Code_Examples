import React, { Component } from 'react';
import Base, {
    WEEK_DAYS,
    THIS_MONTH,
    THIS_YEAR,
    CALENDAR_MONTHS,
    CALENDAR_WEEKS,
    getNextMonth,
    getPreviousMonth,
    getStartArray,
    zeroPad,
    arrToDate
} from './calendarHelpers';
import {
    CalendarBody,
    CalendarHeader,
    CalendarArrow,
    CalendarDayLine,
    CalendarDayTitle,
    CalendarMonth,
    CalendarNumber
} from './elements';
import styled from 'styled-components';

let ArrowLeft = styled(CalendarArrow)`
    &::before {
        transform: rotate(90deg);
        margin: 18px 0 0 25px;
    }
`;

let ArrowRight = styled(CalendarArrow)`
    &::before {
        transform: rotate(270deg);
        margin: 18px 25px 0 0;
    }
`;

class Calendar extends Component {

    state = {
        calendarMonth: `${CALENDAR_MONTHS[THIS_MONTH - 1]} ${THIS_YEAR}`,
        selectedDate: [],
        monthDays: [],
        month: THIS_MONTH,
        year: THIS_YEAR,
        minDate: null,
        maxDate: null
    };

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        let { nowDate } = this.props;
        if (prevProps.nowDate !== nowDate) {
            this.init();
        }
    }

    setCalendarMonth = () => {
        let { month, year } = this.state;
        this.setState({ calendarMonth: `${CALENDAR_MONTHS[month - 1]} ${year}` });
    }

    init = () => {
        let { nowDate, minDate, maxDate } = this.props;
        if (nowDate) {
            let startDate = getStartArray(nowDate);
            this.setState({ monthDays: Base(+startDate[1], +startDate[0]),
                selectedDate: startDate,
                month: +startDate[1],
                year: +startDate[0],
                minDate: minDate ? minDate : null,
                maxDate: maxDate ? maxDate : null }, () => this.setCalendarMonth());
        } else {
            this.setState({ monthDays: Base() });
        }
    }

    setPrevMonth = (e) => {
        let { month, year } = this.state;
        let date = getPreviousMonth(month, year);
        e.stopPropagation();
        this.setState({ monthDays: Base(+date.month, +date.year),
            month: +date.month,
            year: +date.year }, () => this.setCalendarMonth());
    }

    setNextMonth = (e) => {
        let { month, year } = this.state;
        let date = getNextMonth(month, year);
        e.stopPropagation();
        this.setState({ monthDays: Base(+date.month, +date.year),
            month: +date.month,
            year: +date.year }, () => this.setCalendarMonth());
    }

    selectNumber = (e, selectedDate, disabled) => {
        let { onChange } = this.props;
        if (disabled) {
            e.stopPropagation();
        } else {
            this.setState({ selectedDate });
            onChange([
                selectedDate[0],
                zeroPad(selectedDate[1], 2),
                zeroPad(selectedDate[2], 2)
            ].join('-'));
        }
    }

    /**
     * Проверим входит ли дата в доступный интервал. Если он не определен или дата входит в него, вернем true
     * @param item
     * @returns {boolean|*}
     */
    inInterval = (item) => {
        let { minDate, maxDate } = this.props;

        let itemTempVal = new Date(arrToDate(item));
        let itemDate = itemTempVal.getTime();

        let tempMinValue = minDate ? new Date(minDate) : null;
        let tempMaxValue = maxDate ? new Date(maxDate) : null;

        let minValue = tempMinValue ? tempMinValue.getTime() : null;
        let maxValue = tempMaxValue ? tempMaxValue.getTime() : null;

        if (!minDate && !maxDate) return true;
        if (!minDate && maxDate) return (itemDate === maxValue) || (itemDate < maxValue);
        if (!maxDate && minDate) return (itemDate === minValue) || (itemDate > minValue);
        if (maxDate && minDate) return ((itemDate > minValue) || (itemDate === minValue)) && ((itemDate < maxValue) || (itemDate === maxValue));

        return true;
    }

    getItems = (items, start, count, month, now) => {
        let { selectedDate } = this.state;
        let menuItems = [];
        let selectedDateStr = selectedDate.join('-');
        for (let i = start; i < start + count; i++) {
            let item = items[i];
            let disabled = month !== item[1] || !this.inInterval(item);
            let itemStr = item.join('-');
            menuItems.push(<CalendarNumber key={`item${i}`}
                onClick={(e) => this.selectNumber(e, item, disabled)}
                isDisabled={disabled}
                isNow={now[0] === item[0] && now[1] === item[1] && now[2] === item[2]}
                isSelected={selectedDateStr === itemStr}>{item[2]}</CalendarNumber>);
        }
        return menuItems;
    }

    render() {
        let { calendarMonth, monthDays, month } = this.state;
        let { showCalendar } = this.props;
        let weekDays = WEEK_DAYS.map(item => <CalendarDayTitle key={item}>{item}</CalendarDayTitle>);
        let lines = [];

        if (monthDays.length > 0) {
            let viewMonth = month || THIS_MONTH;
            let nowDate = new Date();
            let now = [
                nowDate.getFullYear(),
                nowDate.getMonth() + 1,
                nowDate.getDate()
            ];
            for (let i = 0; i < CALENDAR_WEEKS; i++) {
                lines.push(<CalendarDayLine key={`line${i}`}>{this.getItems(monthDays, i * 7, 7, viewMonth, now)}</CalendarDayLine>);
            }
        }

        return (
            <CalendarBody showCalendar={showCalendar}>
                <CalendarHeader>
                    <ArrowLeft onClick={(e) => this.setPrevMonth(e)} />
                    <CalendarMonth>{calendarMonth}</CalendarMonth>
                    <ArrowRight onClick={(e) => this.setNextMonth(e)} />
                </CalendarHeader>
                <CalendarDayLine>
                    {weekDays}
                </CalendarDayLine>
                <CalendarDayLine>
                    {lines}
                </CalendarDayLine>
            </CalendarBody>
        );
    }
}

export default Calendar;
