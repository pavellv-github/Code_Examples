import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Wrapper, Field, ButtonBlock, FormAgree, FormButton, Message, Fields } from './styled';
import Input from '../input';
import StyledButton from '../buttons/styledButton';
import Throbber from '../throbber/throbber';
import Icon from '../icon';

import InputSimple, { phoneDecorator } from '../inputSimple';
const InputPhone = phoneDecorator(InputSimple);

let Preloader = styled(Throbber).attrs({ className: 'form__preloader' })`
    position: absolute;
    width: 100px;
    height: 100px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    transform: translate(0, 0);
`;

class FormCallback extends PureComponent {

    state = {
        nameValid: false,
        contactValid: false,
        formMessage: '',
        formState: '',
        valueName: '',
        valueContact: '',
        widthWrapper: 730
    };

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            valueName: props.valueName,
            valueContact: props.valueContact
        };
    }

    render() {

        const {
            agreeUrl,
            buttonText,
            onSubmitHandler,
            typeInputName,
            placeholderName,
            placeholderContact,
            errorMessageName,
            errorMessageContact,
            disabledButton,
            waitStatus,
            onChangeContactHandler
        } = this.props;

        const { onChangeNameHandler } = this;

        const { valueName, formMessage, formState, widthWrapper } = this.state;

        return (
            <Wrapper ref={node => this.wrapperForm = node} onSubmit={event => onSubmitHandler(event)}>
                <Fields>
                    <Field widthWrapper={widthWrapper}>
                        <Input
                            placeholder={placeholderName}
                            type={typeInputName}
                            name='inputName'
                            required={true}
                            onChange={value => onChangeNameHandler(value)}
                            errorMessage={errorMessageName}
                            value={valueName}
                            ref={node => this.inputName = node}
                        />
                    </Field>
                    <Field widthWrapper={widthWrapper}>
                        <InputPhone
                            onChange={onChangeContactHandler}
                            placeholder={placeholderContact}
                            errorMessage={errorMessageContact}
                            name='inputContact'
                        />
                    </Field>
                </Fields>
                <ButtonBlock ref={node => this.buttonBlockForm = node}>
                    <FormButton  ref={node => this.buttonForm = node}>
                        <StyledButton
                            text={buttonText}
                            type='primary'
                            disabled={disabledButton}
                        />
                    </FormButton>
                    <FormAgree ref={node => this.agreeForm = node}>
                        Нажимая кнопку, вы соглашаетесь на обработку&nbsp;
                        <a href={agreeUrl}  target='_blank' rel='noreferrer'>
                        персональных данных &nbsp;
                            <Icon
                                content='\f08e'
                                color='#979797'
                            />
                        </a>
                    </FormAgree>
                </ButtonBlock>
                <Preloader  waitStatus={waitStatus} />
                {
                    formMessage && formState &&
                        <Message formState={formState}>
                            {formMessage}
                        </Message>
                }
            </Wrapper>
        );

    }

    clearForm = () => {
        this.setState({
            formMessage: '',
            formState: '',
            valueName: '',
            valueContact: '',
            nameValid: false,
            contactValid: false
        }, () => {
            document.querySelector('input[name="inputName"]').value = '';
        });
        this.inputName.setState({ touched: false });
    };

    formSuccess = (message) => {
        this.clearForm();
        this.setState({
            formMessage: message,
            formState: 'success',
        });
    };

    formError = (message = 'Не удалось отправить заявку. Пожалуйста, попробуйте еще раз.') => {
        this.setState({
            formMessage: message,
            formState: 'error',
        });
    };

    componentDidMount() {
        this.restylingComponent();
        if (process.browser) {
            window.addEventListener('resize', this.restylingComponent);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.restylingComponent);
    }

    onChangeNameHandler = value => {
        this.props.onChangeNameHandler(value);

        const { nameValid } = this.state;
        if (this.inputName.state.hasError && nameValid) {
            this.setState({ nameValid: false });
        }  else if (!nameValid) {
            this.setState({ nameValid: true });
        }
    }

    setWidthWrapper = () => {
        const { wrapperForm } = this;
        const { widthWrapper } = this.state;
        if (wrapperForm && wrapperForm.offsetWidth !== widthWrapper) {
            this.setState({ widthWrapper: wrapperForm.offsetWidth });
        }
    };

    restylingComponent = () => {
        const { wrapperForm, buttonBlockForm, buttonForm, agreeForm, setWidthWrapper } = this;
        setWidthWrapper();
        if (wrapperForm.offsetWidth < 453) {
            buttonBlockForm.style.flexDirection = 'column';
            buttonForm.style.marginBottom = '10px';
            buttonForm.style.width = '100%';
            agreeForm.style.width = '100%';
            agreeForm.style.paddingLeft = '0';
        } else {
            buttonBlockForm.style.flexDirection = 'row';
            buttonForm.style.marginBottom = '0';
            buttonForm.style.width = '188px';
            agreeForm.style.width = 'calc(100% - 188px)';
            agreeForm.style.paddingLeft = '21px';
        }
    }
}

FormCallback.propTypes = {
    agreeUrl: PropTypes.string,
    buttonText: PropTypes.string,
    onSubmitHandler: PropTypes.func,
    typeInputName: PropTypes.string,
    typeInputContact: PropTypes.string,
    placeholderName: PropTypes.string,
    placeholderContact: PropTypes.string,
    options: PropTypes.array,
    disabledButton: PropTypes.bool,
    onChangeNameHandler: PropTypes.func,
    onChangeContactHandler: PropTypes.func,
    errorMessageName: PropTypes.string,
    errorMessageContact: PropTypes.string,
    formState: PropTypes.string,
    formMessage: PropTypes.string,
    valueName: PropTypes.string,
    valueContact: PropTypes.string,
    waitStatus: PropTypes.bool
};

FormCallback.defaultProps = {
    agreeUrl: '://policy.pdf',
    buttonText: 'Отправить',
    onSubmitHandler: (event, inputName, inputContact) => {
        event.preventDefault();
        console.log('inputName: ', inputName);
        console.log('inputContact: ', inputContact);
    },
    typeInputName: 'name',
    typeInputContact: 'phone',
    placeholderName: 'Как к Вам обращаться?',
    placeholderContact: 'Номер телефона',
    options: [],
    disabledButton: true,
    onChangeNameHandler: () => null,
    onChangeContactHandler: () => null,
    errorMessageName: 'Это поле должно быть заполнено',
    errorMessageContact: 'Это поле должно быть заполнено',
    formState: '',
    formMessage: '',
    valueName: '',
    valueContact: '',
    waitStatus: true
};

export default FormCallback;
