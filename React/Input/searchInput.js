import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete';
import Channel from '../Channel';
import searchIcon from '../../assets/img/icons/search.svg';
import styled from 'styled-components';

const MENU_STYLE = {
    width: '100%',
    maxHeight: '300px',
    position: 'absolute',
    left: '0',
    top: '52px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(87, 87, 87, 0.25)',
    zIndex: 11,
    borderRadius: '0.3em',
};
const SrchInput = styled.div`
    width: 100%;
    height: 48px;
    position: relative;
    &:focus {
        border-color: #fd0;
    }
`;
const Wrapper = styled.div`
    width: 100%;
`;
const Button = styled.button`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 15px;
    right: 16px;
    border: none;
    background-color: transparent;
    padding: 0;
    outline: 0;
    cursor: pointer;
`;
const Input = styled.input`
    width: 100%;
    height: 48px;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #BBBEBF;
    color: #000;
    font-family: robotoLight, sans-serif;
    font-size: 16px;
    padding-left: 15px;
    transition: border-color linear .2s;
    cursor: text;
    border-radius: 4px;
    outline: none;
    &:focus {
        border-color: #000;
    }
    ::-ms-clear,::-ms-reveal {
        display: none;
        width : 0;
        height: 0;
    }
`;
const Item = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.isHighlighted ? '#f3f4f5' : '#fff'};
    padding: ${props => props.extraPadding ? '7px 14px' : '16px 5px'};
    cursor: pointer;
`;

export default class SearchInput extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        onSearch: PropTypes.func,
        onClearSearch: PropTypes.func,
        items: PropTypes.array,
    };

    static defaultProps = {
        onSearch: () => {},
        onClearSearch: () => {},
        items: [],
        itemValue: 'label',
    };

    state = {
        search: '',
    };

    clearInput = () => {
        this.setSearch('');
    };

    inputHandler = (e) => {
        const value = e.target.value;

        this.setSearch(value);
    };

    onSelect = (value) => {
        this.setSearch(value, () => {
            this.search();
        });
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.search();
        }
    };

    setSearch = (value, callback) => {
        this.setState({
            search: value,
        }, callback);
    };

    search = () => {
        const { search } = this.state;
        let { onClearSearch, onSearch } = this.props;

        if (!search) {
            onClearSearch();
        }

        onSearch(search.toLowerCase().trim());
    };

    getItemValue = (item) => {
        return item.title;
    };

    shouldItemRender = (item, value) => {
        if (!value) {
            return false;
        }

        return item.title.toLowerCase().includes(value.toLowerCase());
    };

    renderInput = (props) => {
        const { placeholder } = this.props;

        return (
            <Wrapper >
                <Input
                    {...props}
                    onKeyPress={this.onKeyPress}
                    type='text'
                    placeholder={placeholder}
                />
                <Button type='button' onClick={this.search}>
                    <img src={searchIcon} alt='Поиск'/>
                </Button>
            </Wrapper>
        );
    };

    renderItem = (item, isHighlighted) => {
        let { needLogo } = this.props;
        return (
            <Item key={item.text} isHighlighted={isHighlighted} extraPadding={needLogo}>
                <Channel link={item.link} image={ needLogo ? item.logo : '' } text={item.title}/>
            </Item>
        );
    };

    render() {
        const { items } = this.props;
        const { search } = this.state;

        return (
            <SrchInput >
                <Autocomplete
                    wrapperStyle={{
                        width: '100%',
                        position: 'relative',
                    }}
                    menuStyle={MENU_STYLE}
                    items={items}
                    value={search}
                    onChange={this.inputHandler}
                    onSelect={this.onSelect}
                    getItemValue={this.getItemValue}
                    shouldItemRender={this.shouldItemRender}
                    renderInput={this.renderInput}
                    renderItem={this.renderItem}
                />
            </SrchInput>
        );
    }
}
