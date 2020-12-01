import React, { PureComponent } from 'react';
import styled from 'styled-components';
import IMask from 'imask';
import calendar from '../../assets/img/icons/calendar.svg';
import { CALENDAR_MONTHS_FOR_DATE, getDateToShow, convertDate } from './calendar/calendarHelpers';
import Calendar from './calendar';
import { InputContainer, InputError, PlaceholderTop, PrettyText, StyledInput, Eye } from './styles';
import AutoComplete from './email/autocomplete';

let CalendarIcon = styled.div`
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

const VALIDATION_REGEXP = {
    name: /[0-9!"№;%:?*()_+=~[\]`@#$^&{},.<>/|\\']/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^*а-яА-ЯёЁ"@№;$%:^<>|=&+?~`()]{8,}$/,
    agreement: /\b([A-z0-9]){5,16}\b/,
    email: /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,64}/i,
    phone: /^((\+7|7|8)+([0-9]){10})$/,
    login: /[a-z0-9]+/i,
    amount: /^\d+(\.\d{0,2})?$/,
    integer: /^[+-]?\d+$/i,
    date: /(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/,
    passportSeries: /([0-9]){4}/i,
    passportNumber: /([0-9]){6}/i,
    card: /([0-9]){4}/i,
};

const MASK = {
    phone: '+{7}(000)000-00-00',
    date: '00.00.0000',
    passportSeries: '00 00',
    passportNumber: '000000',
    card: '0000'
};

class Input extends PureComponent {
    static defaultProps = {
        onChange: () => { },
        onBlur: () => { },
        onKeyUp: () => { },
        lazyMask: true
    };

    // Added as a component property
    static defaultComponentState = {
        hasError: false,
        showErrorText: false,
        touched: false,
        showText: true,
        prettyText: false,
        tempValue: null,
        inputVal: null,
        showHelper: false,
        isFocused: false,
        noBlurValidation: false
    };

    constructor(props) {
        super(props);
        // Set the default state immediately
        this.state = {
            ...Input.defaultComponentState,
        };
    }

    resetStateWithUpdates(stateUpdates = {}) {
        // Rest operators ensure a new object with merged properties and values.
        // Requires the "transform-object-rest-spread" Babel plugin
        this.setState({ ...Input.defaultComponentState, ...stateUpdates }, () => {
            if (this.mask) {
                this.mask.value = '';
                this.mask.updateValue();
            }
        });
    }

    componentDidMount() {
        let { value, type, defaultValue, lazyMask } = this.props;
        this.validate(value);
        this.showText(type !== 'hidden' && type !== 'password');
        let input = this.refs.input;
        let mask = MASK[type];
        if (input && mask) {
            this.mask = new IMask(input, {
                mask: mask,
                lazy: lazyMask
            });
            this.mask.alignCursor();

            if (type === 'date') {
                if (window) {
                    window.addEventListener('click', this.hideHelper);
                }
                this.setTempValue(defaultValue);
            }
        }
    }

    componentWillUnmount() {
        let { type } = this.props;
        if (this.mask && this.mask.destroy) {
            this.mask.destroy();
        }
        if (type === 'date') {
            window.removeEventListener('click', this.hideHelper);
        }
    }

    // если есть minDate или maxDate, после выбора даты возможен ввод, нужно проверить значение
    checkDate = (value) => {
        let { minDate, maxDate } = this.props;
        let isValid = true,
            isValidMin,
            isValidMax;
        let valueDate = new Date(value);

        if (minDate) {
            let minD = new Date(minDate);
            isValidMin = valueDate > minD;
            isValid = isValidMin;
        }
        if (maxDate) {
            let maxD = new Date(maxDate);
            isValidMax = valueDate < maxD;
            isValid = isValidMin ? isValidMin && isValidMax : isValidMax;
        }
        return isValid;
    }

    validate = (value) => {
        return new Promise((resolve) => {
            let { type, min, max, required } = this.props;
            let { hasError } = this.state;
            if (VALIDATION_REGEXP[type] !== undefined) {
                let invalid = type === 'name'
                    ?   VALIDATION_REGEXP[type].test(value)
                    :   !VALIDATION_REGEXP[type].test(value);
                if ((min && Number(value) < min) || (max && Number(value) > max)) {
                    invalid = true;
                }

                if (!required && value === '') invalid = false;
                if (type === 'name' && required && value === '') invalid = true;

                if (type === 'date') {
                    invalid = invalid || !this.checkDate(value);
                }

                if (hasError !== invalid) {
                    this.setHasError(!hasError).then((res) => {
                        resolve(res);
                    });
                } else {
                    resolve(!hasError);
                }
            } else {
                resolve(true);
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

    onKeyPress = (event, regexpToReplace, replaceTo, convertFunc) => {
        if (event.which === 13) {
            this.setState({ tempValue: null });
            let value = this.getValue(event, regexpToReplace, replaceTo, convertFunc);
            this.check(value).then((isValid) => {
                if (isValid) {
                    this.setPrettyText(value);
                    this.props.onChange(value);
                }
            });
        }
    }

    showText = (value) => {
        this.setState({
            showText: value
        });
    }

    blur = (event, regexpToReplace, replaceTo, convertFunc) => {
        this.toggleFocus();

        if (this.state.noBlurValidation) {
            return;
        }

        const value = this.getValue(
            event,
            regexpToReplace,
            replaceTo,
            convertFunc
        );

        this.check(value)
            .then(isValid => {
                if (isValid) {
                    this.setPrettyText(value);
                    this.setState({ inputVal: value });
                } else {
                    this.setState({ inputVal: null });
                }
                this.setShowError(this.state.hasError);
            })
            .then(() => {
                this.props.onBlur(event, value);
            });
    }

    getValue = (event, regexpToReplace, replaceTo, convertFunc) => {
        let { type } = this.props;
        let value = this.mask && type !== 'date' ? this.mask.unmaskedValue : event.target.value;
        if (regexpToReplace) {
            value = value.replace(regexpToReplace, replaceTo ? replaceTo : '');
        }
        if  (convertFunc) {
            value = convertFunc(value);
        }
        return value;
    }

    change = (event, regexpToReplace, replaceTo, convertFunc) => {
        let { type } = this.props;
        if (this.mask) {
            this.mask.updateValue();
        }
        this.setState({ tempValue: null });
        let value = this.getValue(event, regexpToReplace, replaceTo, convertFunc);
        this.setShowError();
        this.check(value).then((isValid) => {
            if (isValid || type !== 'date') {
                this.props.onChange(value);
            }
        });
    }

    onPaste = (event) => {
        if (this.mask) {
            let masked = this.mask.masked;
            let text = event.clipboardData.getData('text');
            masked.value = text;
            this.props.onChange(masked.unmaskedValue);
        }
    }

    setPrettyText = (value) => {
        let { type } = this.props;
        if (value) {
            switch (type) {
            case 'date': {
                let dateArr = value.split('-');
                let prettyText = null;
                let date = new Date(value);
                if (date) {
                    prettyText = `${dateArr[2]} ${CALENDAR_MONTHS_FOR_DATE[dateArr[1] - 1]} ${dateArr[0]}`;
                }
                this.setState({ prettyText });
                break;
            }
            }
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
            if (this.mask) {
                this.mask.updateValue();
                this.check(value);
                this.props.onChange(value);
            }
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
        showHelper ? this.showHelper(e, false) : null;
    }

    /**
     * Set email input value after selecting one from the list,
     * and validate it
     * @param {String} value email value, selected in the autocompletion list
     */
    onEmailSelect = value => {
        this.check(value).then(isValid => {
            this.setShowError(this.state.hasError);

            this.pushOnChangeEvent(value);

            this.setState({
                inputVal: isValid ? value : null,
                tempValue: value
            });
        });
    };

    /**
     * Force onchange event on the input after email autocompletion form is closed
     * @param {String} value
     */
    pushOnChangeEvent(value) {
        if (!value) {
            return;
        }

        const input = this.refs.input;
        const valueSetter = Object.getOwnPropertyDescriptor(input, 'value')
            .set;
        const prototype = Object.getPrototypeOf(input);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(
            prototype,
            'value'
        ).set;

        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(input, value);
        } else {
            valueSetter(input, value);
        }

        input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    setContainerRef = el => {
        this.containerRef = el;
    };

    setNoBlurValidation = (val = false) => {
        this.setState(() => ({
            noBlurValidation: val
        }));
    };

    render() {
        // attrs - стандартные атрибуты
        let { type, value, errorMessage, required,  autoComplete = 'off', className, minDate, maxDate, placeholder, emailDomains, ...attrs } = this.props;
        let { touched, hasError, showText, showErrorText, prettyText, tempValue, inputVal, showHelper, isFocused } = this.state;
        let icon = null;
        let inputType = type || 'text';
        attrs.onChange = event => this.change(event);
        if ((type === 'phone') && MASK[type]) {
            attrs.onKeyUp = event => this.change(event);
        }
        attrs.onBlur = event => this.blur(event);
        switch (type) {
        case 'amount':
            inputType = 'text';
            attrs.onChange = event => this.change(event, /,/g, '.');
            attrs.onBlur = event => this.blur(event, /,/g, '.');
            break;
        case 'date':
            inputType = 'text';
            attrs.onChange = event => this.change(event, null, null, convertDate);
            attrs.onBlur = event => this.blur(event, null, null, convertDate);
            attrs.onKeyPress = event => this.onKeyPress(event, null, null, convertDate);
            icon = <CalendarIcon onClick={(e) => this.showHelper(e)} />;
            break;
        case 'phone':
        case 'integer':
            inputType = 'text';
            attrs.onChange = event => this.change(event, /\D/g);
            break;
        case 'hidden':
        case 'password':
            inputType = showText ? 'text' : 'password';
            icon = <Eye open={showText} onTouchStart={() => this.showText(true)}
                onMouseDown={() => this.showText(true)} onMouseUp={() => this.showText(false)} />;
            attrs.onChange = event => this.change(event, /\s/ig);
            break;
        case 'agreement':
            inputType = 'text';
            attrs.maxLength = 16;
            break;
        case 'email':
        case 'login':
            attrs.onChange = event => this.change(event, /[а-яё ]/ig);
            break;
        default:
            break;
        }
        let hasMask = this.mask && this.mask.masked.unmaskedValue;
        let emptyValue = !(hasMask || (this.refs.input && this.refs.input.value) || value);
        let valid = touched && !hasError && ((!emptyValue && !required) || (!emptyValue && required));
        let notValid = touched && ((required && emptyValue) || hasError);
        let error = errorMessage && showErrorText ? <InputError show={notValid}>{errorMessage}</InputError> : null;
        let pretty = prettyText ? <PrettyText onClick={this.hidePretty}>{prettyText}</PrettyText> : null;
        return (
            <InputContainer className={className} ref={this.setContainerRef}>
                <StyledInput
                    ref='input'
                    value={tempValue || value}
                    type={inputType}
                    notValid={notValid}
                    valid={valid}
                    onKeyPress={this.onKeyPress}
                    onPaste={this.onPaste}
                    onFocus={this.toggleFocus}
                    showText={showText}
                    required={required}
                    autoComplete={autoComplete}
                    pretty={pretty}
                    placeholder={isFocused || value ? '' : placeholder}
                    isHasMask={hasMask}
                    isIconExist={icon}
                    {...attrs}
                />
                {pretty}
                {
                    isFocused || value || hasMask ? <PlaceholderTop isIconExist={!!icon}>{placeholder}</PlaceholderTop> : null
                }
                {icon}
                {error}
                {type === 'date' &&
                    <Calendar
                        showCalendar={showHelper}
                        onChange={this.setTempValue.bind(this)}
                        nowDate={inputVal}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                }
                {
                    type ===  'email' &&
                    <AutoComplete
                        value={value}
                        handleSelect={this.onEmailSelect}
                        setNoBlurValidation={this.setNoBlurValidation}
                        parentRef={this.containerRef}
                        domains={emailDomains}
                    />
                }
            </InputContainer>

        );
    }
}

export default Input;
