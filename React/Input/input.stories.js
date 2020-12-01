import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import Input from './input';
import styled from 'styled-components';
import Download from './download';
import Textarea from './textarea';
import Address from './address';
import { getStreets, getHouses } from './address/helpersStories';
import DateInput from './date';
import readme from './README.md';
import { withReadme } from 'storybook-readme';

let Date = styled(DateInput)`
  max-width: 300px;
  width: 100%;
`;

class InputExample extends React.Component {
    state = {
        currentValue: null,
        currentValue2: null,
    }

    rangeValue = (param) => (value) => {
        this.setState({
            [param]: value
        });
    }

    render() {
        return (
            <div style={{ flexDirection: 'column' }}>
                <div style={{ display: 'block', marginBottom: '20px', width: '300px' }}>
                    <Input type='phone' placeholder='Phone' onChange={this.rangeValue('currentValue1')} errorMessage='Введите корректный tel'  autoFocus required/>
                    <p>Значение(без маски): {this.state.currentValue1}</p>
                </div>
                <div style={{ display: 'block', width: '300px' }}>
                    <Input type='phone' placeholder='Phone' onChange={this.rangeValue('currentValue2')} errorMessage='Введите корректный tel' lazyMask={false} autoFocus required/>
                    <p>Значение(с маской): {this.state.currentValue2}</p>
                </div>
            </div>
        );
    }
}


class DateExample extends React.Component {
    state = {
        currentValue: '2019-06-04'
    }

    changeValue = (value) => {
        this.setState({
            currentValue: value
        });
    }

    rangeValue = (param) => (value) => {
        this.setState({
            [param]: value
        });
    }

    render() {
        let { currentValue, startValue, endValue } = this.state;
        return (
            <Fragment>
                <div style={{ display: 'block', width: '300px' }}>
                    <DateInput
                        type='date'
                        placeholder='Дата'
                        onChange={this.changeValue}
                        defaultValue={currentValue}
                        errorMessage='Введите корректную дату'
                        required/>
                    <p>Значение: {currentValue}</p>
                </div>
                <div style={{ display: 'block', width: '100%' }}>
                    <h2>Интервалы:</h2>
                    <Date type='date'
                        placeholder='Начало'
                        maxDate={endValue}
                        onChange={this.rangeValue('startValue')}
                        defaultValue={startValue}
                        errorMessage='Введите корректную дату'
                        required/>

                    <Date type='date' placeholder='Конец'
                        minDate={startValue}
                        onChange={this.rangeValue('endValue')}
                        defaultValue={endValue}
                        errorMessage='Введите корректную дату'
                        required/>
                    <p>Начало: {startValue}</p>
                    <p>Конец: {endValue}</p>
                </div>
            </Fragment>
        );
    }
}

class TextAreaInput extends React.Component {

    state = {
        text: '',
    }

    handleChange = (value) => {
        this.setState({
            text: value
        });
    }

    render() {
        let { text } = this.state;
        return (
            <div style={{ width: '360px', height: '100px' }}>
                <Textarea
                    placeholder='Введите комментарий не более 144 символов'
                    maxLength='144'
                    value={text}
                    onChange={value => this.handleChange(value)}
                    errorMessage='required'
                    required
                />
            </div>
        );
    }
}

class DownloadInput extends React.Component {
    state = {
        text: ''
    }

    handleChange = (value) => {
        this.setState({
            text: value
        });
    }

    render() {
        return (
            <div style={{ display: 'block', width: '300px', marginTop: '50px' }}>
                <Download
                    text='Загрузите или перетащите файл'
                    hint='Вы можете прикрепить до 5 файлов'
                    onChange={this.onChange}
                    allowedTypes={ ['image/png', 'image/jpeg'] }
                    typesForError='png, jpeg'
                />
            </div>
        );
    }
}

class OtherTypes extends React.Component {

    state = {
        text: '',
        name: '',
        integer: '',
        phone: '',
        email: '',
        agreement: '',
        amount: '',
        password: '',
        passwordHidden: ''
    }

    handleChange = (elem, value) => {
        this.setState({
            [elem]: value
        });
    }

    render() {
        let { text, name, integer, email, agreement, amount, password, passwordHidden } = this.state;
        return (
            <div style={{ display: 'block' }}>
                <h3>Поддерживаются стандартные типы и новые</h3>
                <div style={{ width: '360px' }}>
                    <Input type='text' placeholder='Текст' value={text} onChange={(value) => this.handleChange('text', value)}/>
                    <Input type='name' placeholder='Только буквы' errorMessage='Должны быть только буквы' required value={name} onChange={(value) => this.handleChange('name', value)}/>
                    <Input type='integer' placeholder='Только цифры' value={integer} onChange={(value) => this.handleChange('integer', value)} errorMessage='Должны быть только цифры'/>
                    <Input type='phone' placeholder='Телефон' onChange={(value) => this.handleChange('phone', value)} errorMessage='Введите корректный номер телефона'/>
                    <Input type='email' placeholder='Email' value={email} onChange={(value) => this.handleChange('email', value)} errorMessage='Введите корректный email'/>
                    <Input type='agreement' placeholder='Номер договора' value={agreement} onChange={(value) => this.handleChange('agreement', value)} errorMessage='Допустимы цифры и латинские буквы'/>
                    <Input type='date' placeholder='Дата' onChange={(value) => this.handleChange('date', value)} errorMessage='Введите корректную дату'/>
                    <Input type='amount' placeholder='Сумма' min='10' max='15000' errorMessage='Сумма не удовлетворяет требованиям' value={amount} onChange={(value) => this.handleChange('amount', value)}/>
                    <Input type='password' placeholder='Новый пароль' errorMessage='Пароль не удовлетворяет требованиям' required value={password} onChange={(value) => this.handleChange('password', value)}/>
                    <Input type='hidden' placeholder='Пароль' value={passwordHidden} onChange={(value) => this.handleChange('passwordHidden', value)}/>
                    <Input type='submit' value='Submit' />
                    <TextAreaInput/>
                </div>
            </div>
        );
    }

}

class InputAddrEx extends React.Component {
    state = {
        addressData: {},
    }

    catchAddressData = (data) => {
        this.setState({
            addressData: data
        });
    }

    render() {
        return (
            <div style={{ display: 'block' }}>
                <Address
                    getStreets={getStreets}
                    getHouses={getHouses}
                    catchAddressData={this.catchAddressData}
                />
            </div>
        );
    }
}

storiesOf('Инпут', module)
    .addDecorator(withReadme(readme))
    .add('Пример', () => <InputExample />)
    .add('Дата', () => <DateExample />)
    .add('Загрузка файлов', () => <DownloadInput/>)
    .add('Остальные типы', () => <OtherTypes/>)
    .add('Адрес', () => <InputAddrEx/>);
