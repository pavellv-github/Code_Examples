#Декораторы phoneDecorator и nameDecorator для InputSimple
Добавляют функционал простому компаненту.
Компонент, который возвращает деоратор принимает в себя value сам форматирует, проверяет и возвращет отформатированное значение, состояние (isValid) и функцию clearInput для очистки поля после отправки формы.

#####Далее приведен пример для декоратора phoneDecorator, но остальные декораторы имеют теже самые параметры и передаюь в onChange ту же самую структуру данных.

####Параметры

props | type | описание | default
--- | --- | --- | ---
name | string | параметр name поля input | phone
placeholder | string | параметр placeholder поля input | Номер телефона
errorMessage | string | Текст сообщения при неверном заполнении поля | Введите телефон в формате +7 (999) 999-99-99
onChange | func | функция, которая будет вызвана при изменении значения поля input

####Принимаемая функция

При изменении значения input в функцию onChange принятую через props передается единственный параметр в виде объекта со следующими свойствами и методами:

####Параметры и методы объекта, переданого в функцию onChange
key | type | описание
--- | --- | ---
value | string | введенный номер телефона
isValid | bool | если номер телефона введен верно и полностью, то isValid = true
clearInput | func | метод, вызов которого очищает поле номера телефона и приводит его к первоначальному состоянию
initialValue | string | значение по умолчанию

####Пример
```javascript
    import { InputSimple, phoneDecorator } from '@ertelecom/ui-react';
    
    const InputPhone = phoneDecorator(InputSimple);

    <InputPhone
        onChange={stateInput => console.log(stateInput)}
        placeholder='Номер телефона'
        errorMessage='Введите телефон в формате +7 (999) 999-99-99'
    />
```
