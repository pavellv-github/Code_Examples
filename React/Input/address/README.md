## Компонент Address

Состоит из трех инпутов: улица, дом, квартира.
Инпуты улицы и дома реализованы через select, квартира - Input из ui-react. Введенные данные пробрасываются в родительский компонент в виде массива после того, как были заполнены все 3 поля и валидация прошла успешно.

_Пропсы_:
- getStreets: функция-коллбэк для получения списка улиц;
- getHouses: функция-коллбэк для получения списка домов по улице;
- catchAddressData: функция-коллбэк для прокидывания полученных данных в родительский компонент;
- (необязательный) addrInfo: объект с дефолтными значениями

Пример дефолтных значений (props.addrInfo):

```javascript
const addrInfo = {
    "flat": {
        "value": "1",
        "label": "1"
    },
    "house": {
        "value": "151/б",
        "label": "575447"
    },
    "street": {
        "value": "7220",
        "label": "Ленина (Новоалтайск)"
    }
}
```

_Стэйты_:
- street: массив улицы, содержит идентификатор (value) и наименование (label);
- streetValue: наименование улицы (street.label);
- house: массив дома, аналогично street;
- houseValue: номер дома (house.label);
- flat: номер квартиры;
- errorMessages: объект с сообщениями об ошибках;
- housesList: объект списока домов (house_id, house_num).

```javascript
    <Address
        getStreets={this.getStreets}
        getHouses={this.getHouses}
        catchAddressData={this.catchAddressData}
        addrInfo={this.state.addressData}
    />
```
