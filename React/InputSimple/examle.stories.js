import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';
import InputSimple, { phoneDecorator, nameDecorator } from './index';
import { Container, Title, Description, Wrapper } from './exampleStyle';
import readme from './README.md';
import readmePhoneDecorator from './decorators/README.md';

const InputPhone = phoneDecorator(InputSimple);
const InputName = nameDecorator(InputSimple);

storiesOf('Простой Input', module)
    .addDecorator(withKnobs)
    .addDecorator(withReadme(readme))
    .add('InputSimple', () => (
        <Container>
            <Title>Простой Input</Title>
            <Description>
                Все управление происходит при помощи изменения пропсов в панели KNOBS
            </Description>
            <Wrapper>
                <InputSimple
                    value={text('value', 'Value')}
                    placeholder={text('placeholder', 'placeholder')}
                    showText={boolean('showText', true)}
                    errorMessage={text('errorMessage', 'errorMessage')}
                    isNotValid={boolean('isNotValid', false)}
                    isValid={boolean('isValid', false)}
                    inputType={text('inputType', 'text')}
                    onChange={e => action('onChange', e)}
                />
            </Wrapper>
        </Container>
    ))
    .addDecorator(withReadme(readmePhoneDecorator))
    .add('phoneDecorator', () => (
        <Container>
            <Title>Input для телефона</Title>
            <Description>
                Применен декоратор phoneDecorator.
            </Description>
            <Wrapper>
                <InputPhone
                    onChange={action('onChange')}
                    placeholder={text('placeholder', 'Номер телефона')}
                    errorMessage={text('errorMessage', 'Введите телефон в формате +7 (999) 999-99-99')}
                    initialValue={text('initialValue', '')}
                />
            </Wrapper>
            <Description>
                Для того, чтобы создать Input для телефона из InputSimple нужно передать его в декаратор phoneDecorator.
                Пример: const InputPhone = phoneDecorator(InputSimple);
            </Description>
        </Container>
    ))
    .add('nameDecorator', () => (
        <Container>
            <Title>Input для имени</Title>
            <Description>
                Применен декоратор nameDecorator.
            </Description>
            <Wrapper>
                <InputName
                    onChange={action('onChange')}
                    placeholder={text('placeholder', 'Ваше имя')}
                    errorMessage={text('errorMessage', 'Ожидаются только буквы и дефисы')}
                    initialValue={text('initialValue', '')}
                />
            </Wrapper>
            <Description>
                Для того, чтобы создать Input для имени из InputSimple нужно передать его в декаратор nameDecorator.
                Пример: const InputName = nameDecorator(InputSimple);
            </Description>
        </Container>
    ));
