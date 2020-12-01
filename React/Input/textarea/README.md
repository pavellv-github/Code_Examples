## Поле для ввода большого количества текста

```javascript
    <Textarea
        value={value}
        placeholder="Введите комментарий не более 144 символов"
        maxLength="144"
        onChange={value => this.handleChange(value)}
        required
    />
```
