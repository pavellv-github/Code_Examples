import React, { useEffect, useState } from 'react';
import { checkValidate } from './halpers/nameDecorator';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const nameDecorator = Input => props => {

    const {
        placeholder,
        errorMessage,
        className,
        onChange,
        name,
        initialValue
    } = props;

    const [isValid, setIsValid] = useState(false);
    const [isNotValid, setIsNotValid] = useState(false);
    const [value, setValue] = useState(initialValue);

    const onChangeHandler = event => {
        event.preventDefault();
        const value = event.target.value;
        setValue(value);
        setIsValid(checkValidate(value));
    };

    const clearInput = () => {
        setValue('');
        setIsValid(false);
        setIsNotValid(false);
    };

    const onBlurHandler = () => {
        setIsNotValid(!isValid);
    };

    useEffect(() => onChange({ value: value, isValid, clearInput }), [value, isValid]);
    useEffect(() => setValue(initialValue), [initialValue]);
    useEffect(() => setIsValid(checkValidate(value)), [value]);

    return (
        <Input
            value={value}
            name={name}
            placeholder={placeholder}
            showText={true}
            errorMessage={errorMessage}
            isNotValid={isNotValid}
            inputType='text'
            isValid={isValid}
            className={className}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
        />
    );
};

nameDecorator.PropTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    initialValue: PropTypes.string
};

nameDecorator.defaultProps = {
    placeholder: 'Ваше имя',
    name: 'name',
    errorMessage: 'Ожидаются только буквы и дефисы',
    className: '',
    onChange: () => null,
    initialValue: ''
};

export default nameDecorator;
