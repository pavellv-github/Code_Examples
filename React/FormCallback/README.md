## В компонент передаются параметры:
+ agreeUrl - ссылка на согласие на обработку персональных данных;
+ buttonText - текст на кнопке;
+ typeInputName - тип первого поля ввода, по умолчанию "";
+ typeInputContact: 'phone';
> typeInputName и typeInputContact могут быть (integer, phone, email, agreement, amount);
+ placeholderName - placeholder для первого поля;
+ placeholderContact- placeholder для второго поля;
+ onSubmitHandler - функция обработки отправки формы, при отправке формы в параметры функции падают:
event, inputName - value первого поля, inputContact - value второго поля.
+ onChangeNameHandler и onChangeContentHandler - функции, которые обрабатывают изменения 
соответствующих полей ввода.
+ errorMessageName и errorMessageContact - текст ошибки для полей ввода
+ valueName/valueContact - value соответствующих полей
+ waitStatus - статус формы при отправке, показывает прелодер если
равно false, если true прелодер скрыт
## помимо параметров у компонента есть функции, которые можно вызвать через ref
+ formSuccess(message) - переводит форму в состояние успешной отправки и выводит сообщение,
которое получает из параметра message
+ formError(message) - переводит форму в состояние не успешной отправки и выводит сообщение,
которое получает из параметра message