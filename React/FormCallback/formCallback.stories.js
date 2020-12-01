import React from 'react';
import styled from 'styled-components';
import readme from './README.md';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import FormCallback from './index';

const MIN_NAME_LENGTH = 2;

const Button = styled.div`
    display: inline-block;
    margin: 0 20px 20px;
    padding: 10px;
    border: 1px solid #000000;
    cursor: pointer;
`;

class Example extends React.PureComponent {

    state = {
        valueName: '',
        valueContact: '',
        nameValidated: false,
        contactValidated: false
    };

    render() {

        const { onChangeNameHandler, onChangeContactHandler } = this;

        const { nameValidated, contactValidated, valueName, valueContact } = this.state;

        return (
            <React.Fragment>

                <Button onClick={this.clearForm} > Изначальное состояние </Button>
                <Button onClick={this.formSuccess}>Успех</Button>
                <Button onClick={() => this.form.formError()}>Ошибка</Button>

                <FormCallback
                    buttonText='Отправить заявку'
                    typeInputName='name'
                    typeInputContact='phone'
                    placeholderName='Как Вас зовут?'
                    placeholderContact='Номер телефона'
                    disabledButton={!nameValidated || !contactValidated}
                    onChangeNameHandler={onChangeNameHandler}
                    onChangeContactHandler={onChangeContactHandler}
                    errorMessageName='Только буквы'
                    errorMessageContact='Это поле должно быть заполнено'
                    valueName={valueName}
                    valueContact={valueContact}
                    ref={node => this.form = node}
                />
            </React.Fragment>
        );
    }

    clearForm = () => {
        this.form.clearForm();
        this.setState({ valueName: '', valueContact: '' });
    };

    formSuccess = () => {
        this.form.formSuccess('Заявка отправлена');
        this.setState({ valueName: '', valueContact: '' });
    };

    onChangeNameHandler = value => {
        this.setState({ valueName: value });
        if (value.length >= MIN_NAME_LENGTH) {
            this.setState({ nameValidated: true });
        } else {
            this.setState({ nameValidated: false });
        }
    };

    onChangeContactHandler = data => {
        this.setState({
            valueContact: data.value,
            contactValidated: data.isValid
        });
    };
}


storiesOf('Формы', module)
    .addDecorator(withReadme(readme))
    .add('CallBack', () => <Example/>);

