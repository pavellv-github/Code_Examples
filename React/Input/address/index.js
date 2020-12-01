import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Select from '../../select/select';
import Input from '../input';
import { COLORS } from '../../../assets/js/constants';

let AddressContainer = styled.div`
    flex-direction: row;
    @media (max-width: 480px) {
        flex-direction: column;
    }
`;
// если не указать opacity, value рисуется с задержкой
let DropDown = styled(Select)`
    input {
        opacity: 1 !important;
    }
    ${props => props.value && props.asyncMode && css`
        > * {
          border-color: ${COLORS.green};
        }
    `}
`;
let AsyncDropDown = props => (<DropDown
    asyncMode={true}
    cacheOptions={false}
    isSearchable={true}
    isClearable={true}
    components={{
        DropdownIndicator: null,
    }}
    loadingMessage={() => 'Поиск'}
    {...props}
/>);

let StreetContainer = styled.div`
    margin-right: ${p => p.marginRight ? p.marginRight : '24'}px;
    width: ${p => p.height ? p.height : '330'}px;
    margin-bottom: 20px;
    @media (max-width: 1024px) {
        margin-right: 20px;
        width: 320px;
    }
    @media (max-width: 820px) {
        margin-right: 15px;
        width: 235px;
    }
    @media (max-width: 480px) {
        margin-right: 0;
        width: 100%;
    }
`;
let HouseContainer = styled.div`
    margin-right: ${p => p.marginRight ? p.marginRight : '24'}px;
    width: ${p => p.height ? p.height : '150'}px;
    @media (max-width: 1024px) {
        width: 148px;
    }
    @media (max-width: 820px) {
        margin-right: 15px;
        width: 111px;
    }
    @media (max-width: 480px) {
        width: 45%;
    }
`;
let FlatStyled = styled(Input)`
    width: ${p => p.height ? p.height : '150'}px;
    @media (max-width: 1024px) {
        width: 148px;
    }
    @media (max-width: 820px) {
        width: 111px;
    }
    @media (max-width: 480px) {
        width: 45%;
    }
`;
let ApartmentContainer = styled.div`
    @media (max-width: 480px) {
        justify-content: space-between;
    }
`;

class Address extends Component {
    static propTypes = {
        addrInfo: PropTypes.object,
        getStreets: PropTypes.func,
        getHouses: PropTypes.func,
        catchAddressData: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            street: '',
            streetValue: '',
            house: '',
            houseValue: '',
            flat: '',
            housesList: [],
        };
        this.flatInput = React.createRef();
        this.streetDropDown =  React.createRef();
        this.houseDropDown =  React.createRef();
    }

    componentDidMount() {
        this.getPreviousData();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.addrInfo) !== JSON.stringify(this.props.addrInfo)) this.getPreviousData();
    }

    // получение значений из пропсов (если есть)
    getPreviousData = () => {
        let { addrInfo = {} } = this.props;
        if (addrInfo.street && addrInfo.street.label && addrInfo.house.label && addrInfo.flat.label) {
            // получаем список улиц
            this.loadStreets(addrInfo.street.label)
                .then(response => {
                // чтобы избежать многочисленных вызовов setState, просто найдем нашу улицу
                // потом уже со всем остальным запишем в state
                    let streetObj = response.find(item => item.label === addrInfo.street.label);

                    this.props.getHouses({ street_id: streetObj.value })
                        .then(allHousesNotformat => {
                            this.setState({
                                housesList: allHousesNotformat
                            }, () => {
                                this.loadHouses(addrInfo.house.label)
                                    .then(allHousesFormat => {
                                        let currentHouse = allHousesFormat.find(item => item.label === addrInfo.house.label);
                                        this.setState({
                                            street: streetObj,
                                            streetValue: streetObj.label,
                                            house: currentHouse,
                                            houseValue: currentHouse.label,
                                            flat: addrInfo.flat.label,
                                        });
                                    });
                            });
                        })
                        .catch(err => console.log('get houses error:', err));
                })
                .catch(err => console.log('get streets error:', err));
        }
    }

    validate = () => {
        let { street, house, flat } = this.state;
        let isValid = Boolean(street) && Boolean(house) && Boolean(flat);

        if (isValid) this.throwAddrData();
        this.setState({
            isValid,
        });
    };

    // формирование сообщения, если нет options
    noOptionsMessage = (field, message) => ({ inputValue }) =>
        inputValue === '' || (`${field}.label` === inputValue) ? message : 'Не найдено';

    // коллбэк для выпадающего списка улиц
    changeSearchValue = field => (value, { action }) => {
        let val = this.state[`${field}.label`];
        if (!(action === 'menu-close' || action === 'input-blur' || action === 'set-value')) {
            val = value;
        }
        this.setState({
            [`${field}Value`]: val
        });
    };

    // onChange для поля улицы
    changeStreet = (street) => {
        this.setState({
            street,
            streetValue: street ? street.label : ''
        }, () => {
            let housesList = [];
            if (street) {
                this.props.getHouses({
                    street_id: street.value,
                })
                    .then(data => {
                        housesList = data;
                        this.setState({
                            housesList,
                            house: null,
                            houseValue: '',
                            flat: '',
                        }, () => this.houseDropDown.select.select.inputRef.focus());
                    });
            } else {
                this.setState({
                    housesList,
                    house: null,
                    houseValue: '',
                    flat: ''
                });
            }
        });
    };

    // преобразование пары данных лейбл-значение (ответа коллбэк функций)
    toSelectOption = ({ object, valueKey = 'value', labelKey = 'label' }) => ({
        value: object[valueKey],
        label: object[labelKey],
    });

    // преобразование данных (ответа коллбэк функций)
    toSelectOptions = ({ array, keys }) => array.map(object => this.toSelectOption({
        object,
        ...keys,
    }));

    // загрузка options для инпута улиц
    loadStreets = term => this.props.getStreets({
        term: term.trim(),
    }).then(array => this.toSelectOptions({
        array,
        keys: {
            valueKey: 'street_id',
            labelKey: 'street_name',
        },
    }))
        .catch(e => console.log('loadStreets error:', e.message));

    // загрузка options для инпута домов
    loadHouses = term => new Promise(resolve =>
        resolve(this.state.housesList.filter(item => item.number.toLowerCase().indexOf(term.toLowerCase()) === 0))).then(array => array.sort((a, b) => parseInt(a.number, 10) - parseInt(b.number, 10)))
        .then(array => this.toSelectOptions({
            array,
            keys: {
                valueKey: 'id',
                labelKey: 'number',
            },
        }))
        .catch(e => console.log('loadHouses error:', e.message));

    // onChange для поле дома
    changeHouse = house => {
        this.setState({
            house,
            houseValue: house ? house.label : '',
        }, () => {
            this.validate();
            this.changeFlat('');
            house && this.flatInput.current.refs.input.focus();
        });
    };

    // коллбэк для выпадающего списка домов
    houseInputChange = (...args) => {
        this.changeSearchValue('house')(...args);
    };

    // onChange для поля квартиры
    changeFlat = flat => {
        this.setState({
            flat,
        }, () => this.validate());
    };

    // сбор полученных данных в объект для проброса в функцию-коллбэк
    throwAddrData = () => {
        let { street, house, flat } = this.state;
        let obj = {};
        if (Boolean(street) && Boolean(house) && Boolean(flat)) {
            obj.street = {
                'value': street.value,
                'label': street.label
            };
            obj.house = {
                'value': house.value,
                'label': house.label
            };
            obj.flat = {
                'value': flat,
                'label': flat
            };

            this.props.catchAddressData(obj);
        }
    }

    render() {
        let { street, streetValue, house, houseValue, flat, housesList } = this.state;
        const { widthStreet, widthHouse, widthFlat, marginBetweenFields } = this.props;
        return (
            <AddressContainer >
                <StreetContainer height={widthStreet} marginRight={marginBetweenFields}>
                    <AsyncDropDown
                        value={street}
                        inputValue={streetValue}
                        onChange={this.changeStreet}
                        onInputChange={this.changeSearchValue('street')}
                        loadOptions={term => this.loadStreets(term)}
                        placeholder='Улица'
                        noOptionsMessage={this.noOptionsMessage(street, 'Введите адрес')}
                        selectRef={node => this.streetDropDown = node}
                    />
                </StreetContainer>
                <ApartmentContainer>
                    <HouseContainer height={widthHouse} marginRight={marginBetweenFields}>
                        <AsyncDropDown
                            value={house}
                            inputValue={houseValue}
                            onChange={this.changeHouse}
                            onInputChange={this.houseInputChange}
                            loadOptions={term => this.loadHouses(term)}
                            placeholder='Дом'
                            noOptionsMessage={this.noOptionsMessage(house, 'Укажите номер дома')}
                            isDisabled={!housesList.length}
                            selectRef={node => this.houseDropDown = node}
                        />
                    </HouseContainer>
                    <FlatStyled
                        ref={this.flatInput}
                        size='3'
                        name='flat'
                        type='integer'
                        required={true}
                        placeholder='Квартира'
                        errorMessage='Укажите номер квартиры'
                        value={flat}
                        onChange={this.changeFlat}
                        disabled={!house}
                        height={widthFlat}
                    />
                </ApartmentContainer>
            </AddressContainer>
        );
    }
}

export default Address;
