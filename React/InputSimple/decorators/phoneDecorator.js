import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatValueForPhone, replaceValueForPhone } from './halpers/phoneDecorator';

const phoneDecorator = Input => props => {

    const {
        placeholder,
        errorMessage,
        className,
        onChange,
        name,
        initialValue,
        ...rest
    } = props;

    const input = useRef({});

    const [isValid, setIsValid] = useState(false);
    const [isNotValid, setIsNotValid] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const [value, setValue] = useState(initialValue);

    const onChangeHandler = event => {
        event.preventDefault();
        const value = replaceValueForPhone(event.target.value);
        setValue(value);
        checkValidate(value);
    };

    const onFocusHandler = () => {
        if (!isTouch) setIsTouch(true);
        if (!value || !value.length) {
            setValue('7');
            const timeout = setTimeout(() => {
                input.current.setSelectionRange(3, 3);
                clearTimeout(timeout);
            }, 150);
        }
    };

    const onBlurHandler = () => {
        if (value.length !== 11) setIsNotValid(true);
    };

    const checkValidate = value => {
        if (value && value.length === 11) {
            setIsValid(true);
            setIsNotValid(false);
        } else {
            setIsValid(false);
        }
    };

    const clearInput = () => {
        setIsTouch(false);
        setValue('');
        setIsValid(false);
    };

    useEffect(() => onChange({ value: value, isValid, clearInput }), [value, isValid]);
    useEffect(() => setValue(initialValue), [initialValue]);
    useEffect(() => checkValidate(value), [value]);

    return (
        <Input
            value={(isTouch || Boolean(value)) ? formatValueForPhone(value) : ''}
            name={name}
            placeholder={placeholder}
            showText={true}
            errorMessage={errorMessage}
            isNotValid={isNotValid}
            inputType='phone'
            isValid={isValid}
            className={className}
            onChange={onChangeHandler}
            onPaste={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            ref={input}
            {...rest}
        />
    );
};

phoneDecorator.PropTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    initialValue: PropTypes.string
};

phoneDecorator.defaultProps = {
    placeholder: 'Номер телефона',
    name: 'phone',
    errorMessage: 'Введите телефон в формате +7 (999) 999-99-99',
    className: '',
    onChange: () => null,
    initialValue: ''
};

export default phoneDecorator;
