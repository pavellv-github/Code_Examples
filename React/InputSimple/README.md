#Поле для ввода данных
Этот компонент управляется исключительно через props и имеет в себе минимальный нобор логики.

####Параметры

props | type | описание | default
--- | --- | --- | ---
value | string | параметр value поля input | пусто
name | string | параметр name поля input | пусто
placeholder | string | параметр placeholder поля input | пусто
showText | bool | если false, то текст скрыт точкаи | true
errorMessage | string | Текст сообщения при неверном заполнении поля | пусто
isNotValid | bool | если true то показывается текст ошибки и появляется красная обводка | false
inputType | string | параметр type поля input | пусто | пусто
isValid | bool | если true то появляется зеленая обводка | false
onChange | func | функция, которая будет вызвана при изменении значения поля input
onPaste | func | функция, которая будет вызвана при вставке значения в поле input
onFocus | func | функция, которая будет вызвана при усанаовлении курсора в поле input
onBlur | func | функция, которая будет вызвана при убирании курсора из поля input 

####Принимаемые функции

При сробатывании соответствующего события во все функции принятые через props передается единственный параметр event.


####Пример
```javascript
    <InputSimple
        value='Value'
        placeholder='placeholder'
        showText={true}
        errorMessage='Error'
        isNotValid={false}
        isValid={false}
        inputType='text'
        onChange={e => console.log(e.target.value)}
    />
```
