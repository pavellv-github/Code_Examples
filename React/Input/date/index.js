import React, { PureComponent } from 'react';
import styled from 'styled-components';
import IMask from 'imask';
import calendar from '../../../assets/img/icons/calendar.svg';
import { CALENDAR_MONTHS_FOR_DATE, getDateToShow, convertDate } from '../calendar/calendarHelpers';
import Calendar from '../calendar';
import { InputContainer, InputError, PlaceholderTop, PrettyText, StyledInput } from '../styles';

export const CalendarIcon = styled.div`
    position: absolute;
    background-image: url(${calendar});
    background-repeat: no-repeat;
    background-position: 50%;
    top: 0;
    right: 10px;
    width: 48px;
    height: 48px;
    cursor: pointer;
`;

const VALIDATION_REGEXP = /(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/;

const MASK = '00.00.0000';

class DateInput extends PureComponent {
    static defaultProps = {
        onChange: () => {
        },
        onBlur: () => {
        }
    };

    state = {
        hasError: false,
        showErrorText: false,
        touched: false,
        prettyText: false,
        tempValue: null,
        inputVal: null,
        showHelper: false,
        isFocused: false,
    };

    componentDidMount() {
        let { value, defaultValue } = this.props;
        this.validate(value);
        let input = this.refs.input;
        this.mask = new IMask(input, {
            mask: MASK,
            lazy: true
        });
        this.mask.alignCursor();
        window.addEventListener('click', this.hideHelper);
        this.setTempValue(defaultValue);
    }

    componentWillUnmount() {
        this.mask.destroy();
        window.removeEventListener('click', this.hideHelper);
    }

    validate = (value) => {
        return new Promise((resolve) => {
            let { minDate, maxDate, required } = this.props;
            let { hasError, touched } = this.state;
            let invalid = !VALIDATION_REGEXP.test(value);

            let valueDate = new Date(value);

            if (minDate) {
                let minD = new Date(minDate);
                if (valueDate < minD) {
                    invalid = true;
                }
            }
            if (maxDate) {
                let maxD = new Date(maxDate);
                if (valueDate > maxD) {
                    invalid = true;
                }
            }

            if (touched && required && value === '') invalid = true;

            if (hasError !== invalid) {
                this.setHasError(!hasError).then((res) => {
                    resolve(res);
                });
            } else {
                resolve(!hasError);
            }
        });
    }

    check = (value) => {
        return new Promise((resolve) => {
            if (value !== undefined) {
                this.setTouched(true);
                this.validate(value).then((res) => {
                    resolve(res);
                });
            } else {
                resolve(true);
            }
        });
    }

    setTouched = (value = true) => {
        this.setState({
            touched: value
        });
    }

    setHasError = (value = true) => {
        return new Promise((resolve) => {
            this.setState({
                hasError: value
            }, () => {
                resolve(!value);
            });
        });

    }

    setShowError = (value = false) => {
        this.setState({
            showErrorText: value
        });
    }

    onKeyPress = (event) => {
        if (event.which === 13) {
            this.setState({ tempValue: null });
            let value = this.getValue(event);
            this.check(value).then((isValid) => {
                if (isValid) {
                    this.setPrettyText(value);
                    this.props.onChange(value);
                }
            });
            this.toggleFocus();
            this.setShowError(this.state.hasError);
        }
    }

    blur = (event) => {
        this.toggleFocus();
        let value = this.getValue(event);
        this.check(value).then((isValid) => {
            if (isValid) {
                this.setPrettyText(value);
                this.setState({ inputVal: value });
            } else {
                this.setState({ inputVal: null });
            }
            this.setShowError(this.state.hasError);
        }).then(() => {
            this.props.onBlur(event, value);
        });
    }

    getValue = (event) => {
        return convertDate(event.target.value);
    }

    change = (event) => {
        this.mask.updateValue();
        this.setState({ tempValue: null });
        let value = this.getValue(event);
        this.setShowError();
        this.check(value).then((isValid) => {
            if (isValid) this.props.onChange(value);
        });
    }

    onPaste = (event) => {
        let masked = this.mask.masked;
        let text = event.clipboardData.getData('text');
        masked.value = text;
        this.props.onChange(masked.unmaskedValue);
    }

    setPrettyText = (value) => {
        if (value) {
            let dateArr = value.split('-');
            let prettyText = null;
            let date = new Date(value);
            if (date) prettyText = `${dateArr[2]} ${CALENDAR_MONTHS_FOR_DATE[dateArr[1] - 1]} ${dateArr[0]}`;
            this.setState({ prettyText });
        }
    }

    hidePretty = () => {
        this.setState({ prettyText: null });
        let inputRef = this.refs.input;
        inputRef.focus();
    }

    setTempValue = (value) => {
        let date = new Date(value);
        let showDate = getDateToShow(date);
        this.setPrettyText(value);

        this.setState({
            tempValue: showDate,
            inputVal: value,
            showHelper: false
        }, () => {
            this.mask.updateValue();
            this.check(value);
            this.props.onChange(value);
        });
    }

    toggleFocus = () => {
        this.setState((prevState) => ({
            isFocused: !prevState.isFocused
        }));
    }

    showHelper = (e, def) => {
        e.stopPropagation();
        let { showHelper } = this.state;
        let show = def || !showHelper;
        this.setState({ showHelper: show });
    }

    hideHelper = (e) => {
        let { showHelper } = this.state;
        if (showHelper) this.showHelper(e, false);
    }

    render() {
        // attrs - стандартные атрибуты
        let { errorMessage, required, className, minDate, maxDate, placeholder, ...attrs } = this.props;
        let { hasError, showErrorText, prettyText, tempValue, inputVal, showHelper, isFocused } = this.state;

        let emptyValue = !(this.refs.input && this.refs.input.value);
        let pretty = prettyText ? <PrettyText onClick={this.hidePretty}>{prettyText}</PrettyText> : null;

        return (
            <InputContainer className={className}>
                <StyledInput
                    {...attrs}
                    ref='input'
                    value={tempValue}
                    type='text'
                    notValid={hasError}
                    valid={!hasError}
                    onPaste={this.onPaste}
                    onFocus={this.toggleFocus}
                    showText={true}
                    required={required}
                    pretty={pretty}
                    placeholder={isFocused || !emptyValue ? '' : placeholder}
                    isHasMask={true}
                    isIconExist={true}
                    onChange={event => this.change(event)}
                    onBlur={event => this.blur(event)}
                    onKeyPress={event => this.onKeyPress(event)}
                />
                {pretty}
                {
                    isFocused || !emptyValue ? <PlaceholderTop isIconExist={true}>{placeholder}</PlaceholderTop> : null
                }
                <CalendarIcon onClick={(e) => this.showHelper(e)}/>
                {showErrorText ? <InputError show={hasError}>{errorMessage}</InputError> : null}
                <Calendar showCalendar={showHelper}
                    onChange={this.setTempValue.bind(this)}
                    nowDate={inputVal}
                    minDate={minDate}
                    maxDate={maxDate}/>
            </InputContainer>

        );
    }
}

export default DateInput;
