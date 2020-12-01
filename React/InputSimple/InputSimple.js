import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { InputContainer, Input, PlaceholderTop, InputError } from './styles';

// eslint-disable-next-line react/display-name
const InputSimple = forwardRef((props, ref) => {
    const {
        value,
        placeholder,
        showText,
        errorMessage,
        className,
        isNotValid,
        inputType,
        isValid,
        onChange,
        onPaste,
        onBlur,
        onFocus,
        name
    } = props;

    const onFocusHandler = e => {
        onFocus(e);
        setIsFocused(true);
    };

    const onBlurHandler = e => {
        onBlur(e);
        setIsFocused(false);
    };

    const [isFocused, setIsFocused] = useState(false);

    return (
        <InputContainer className={className}>
            <Input
                value={value}
                showText={showText}
                isNotValid={isNotValid}
                type={inputType}
                isValid={isValid}
                onChange={e => onChange(e)}
                onPaste={e => onPaste(e)}
                onBlur={onBlurHandler}
                placeholder={isFocused ? '' : placeholder}
                onFocus={onFocusHandler}
                name={name}
                ref={ref}
                selectorForTest='input'
                data-test='input'
            />
            {
                (isFocused || Boolean(value.length)) && <PlaceholderTop data-test='placeholder'>{placeholder}</PlaceholderTop>
            }
            {
                isNotValid && <InputError data-test='error'>{errorMessage}</InputError>
            }
        </InputContainer>
    );
});

InputSimple.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    showText: PropTypes.bool,
    errorMessage: PropTypes.string,
    className: PropTypes.string,
    isNotValid: PropTypes.bool,
    inputType: PropTypes.string,
    isValid: PropTypes.bool,
    onChange: PropTypes.func,
    onPaste: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

InputSimple.defaultProps = {
    value: '',
    name: '',
    placeholder: '',
    showText: true,
    errorMessage: '',
    className: '',
    isNotValid: false,
    inputType: '',
    isValid: true,
    onChange: () => null,
    onPaste: () => null,
    onFocus: () => null,
    onBlur: () => null
};

export default InputSimple;
