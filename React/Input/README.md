##Поле для ввода данных
<br /><br />

type | описание
--- | ---
integer | Только цифры
password | Пароль с валидацией
hidden | Как пароль, но без валидации
phone | Номер телефона
email | Электронная почта
agreement | Номер договора

errorMessage - сообщение об ошибке валидации

Все стандартные атрибуты автоматически пробрасываются.

Если инпут с маской, то value лучше не передавать (надо подумать как это исправить)

<br /><br />
```javascript
<Input type="password" placeholder="Введите новый пароль" onChange={this.update} value={this.state.value}/>
```
