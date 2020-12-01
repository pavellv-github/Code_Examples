import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../assets/js/constants';

let TextAreaInput = styled.textarea`
    height: 100%;
    width: 100%;
    resize: none;
    border: 1px solid ${props => props.touched && props.emptyValue && props.required
        ? COLORS.red : (!props.emptyValue && props.touched ? COLORS.green : COLORS.grey)};
    border-radius: 4px;
    padding: 15px 20px;
    font-family: "robotoLight";
    font-size: 16px;
    outline: none;
    transition: border 0.2s ease-in;
    :focus {
        border-color: ${COLORS.black};
    }
    box-shadow: none;
`;
let InputError = styled.p`
    opacity: ${props => props.show ? 1 : 0};
    font-size: ${props => props.show ? '12px' : 0};
    line-height: 2em;
    margin: 0;
    color: ${COLORS.red};
    transition: opacity 0.2s ease-in-out;
`;
class Textarea extends Component {

    state = {
        emptyValue: true,
        touched: false,
    };

    handleChange = (event) => {
        this.setTouched();
        this.props.onChange(event.target.value);
    }

    setTouched = () => {
        this.setState({
            touched: true,
        });
    }

    handleOnBlur = () => {
        let { touched } = this.state;
        let { value, required } = this.props;
        touched && (required && !value)
            ? this.setState({ emptyValue : true })
            : this.setState({ emptyValue : false });
    }

    render() {
        let { placeholder, value, errorMessage, required, ...attrs } = this.props;
        let { emptyValue, touched } = this.state;
        attrs.onChange = event => this.handleChange(event);
        return (
            <React.Fragment>
                <TextAreaInput
                    value={value}
                    placeholder={placeholder}
                    touched={touched}
                    required={required}
                    emptyValue={emptyValue}
                    onBlur={this.handleOnBlur}
                    onPaste={this.handleChange}
                    onKeyPress={this.handleChange}
                    {...attrs}
                />
                {
                    errorMessage && emptyValue && required && touched ? <InputError show={emptyValue}>{errorMessage}</InputError> : null
                }
            </React.Fragment>
        );
    }
}

export default Textarea;
