import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { AutoCompleteContainer, AutoCompleteItem } from './styled';

/**
 * a list of default email domains,
 * can be overriden in component props
 */
const DEFAULT_DOMAINS = [
    'mail.ru',
    'yandex.ru',
    'bk.ru',
    'gmail.com',
    'rambler.ru',
    'ya.ru',
    'list.ru',
    'inbox.ru',
    'icloud.com',
    'yahoo.com'
];

/**
 * handle clicks outside of the input wrapper
 *
 * @param {Object} ref parent container ref
 * @param {Function} fn state property setter function
 */
const useClickOutside = (ref, fn) => {
    const handleClickOutside = e => {
        if (ref && !ref.contains(e.target)) {
            fn();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [fn]);
};

/**
 * Autocomplete addition for the input of email type
 *
 * @param {String} value current input value
 * @param {Object} parentRef input container ref
 * @param {Function} handleSelect exec function on option select
 * @param {Function} setNoBlurValidation toggle input validation on blur
 * @param {Array<String>} domains custom list of email domains
 */
const AutoComplete = ({
    value = '',
    parentRef,
    handleSelect,
    setNoBlurValidation,
    domains = DEFAULT_DOMAINS
}) => {
    const [show, setShow] = useState(false);
    const [refs, setRefs] = useState([]);
    const [focus, setFocus] = useState(-1);

    const [name, domain] = useMemo(() => {
        setShow(!!~value.indexOf('@'));
        setFocus(-1);
        return value.split('@');
    }, [value]);

    const onClickOutside = useCallback(() => {
        show && handleSelect();
        setShow(false);
    }, [show]);

    /**
     * render auto completion list
     */
    const items = useMemo(() => {
        const domainsFiltered = domain
            ? domains.filter(item => item.startsWith(domain))
            : domains;

        if (
            !name ||
            !domainsFiltered.length ||
            (domainsFiltered.length === 1 && domainsFiltered[0] === domain)
        ) {
            setShow(false);
            return null;
        }

        let tempRefs = [];

        const mappedItems = domainsFiltered.map((item, index) => {
            const completion = domain ? item.split(domain)[1] : item;

            return (
                <AutoCompleteItem
                    focused={index === focus}
                    key={`AutoCompleteItem-${index}`}
                    onClick={() => {
                        setShow(false);
                        handleSelect(value + completion);
                    }}
                    ref={el => {
                        tempRefs.push(el);
                    }}
                >
                    <strong>{value}</strong>
                    {completion}
                </AutoCompleteItem>
            );
        });

        setRefs(tempRefs);
        return mappedItems;
    }, [name, domain, focus]);

    /**
     * handle external dependencies of current state
     */
    useEffect(() => {
        setNoBlurValidation(show);
    }, [show]);

    /**
     * bind key actions
     * up: 38, down: 40, enter: 13
     */
    useEffect(() => {
        const handleKeyDown = e => {
            if (!show || !refs.length) {
                return;
            }

            let tempFocus = focus;

            switch (e.keyCode) {
            case 38:
                e.preventDefault();
                tempFocus = tempFocus - 1 < 0 ? refs.length - 1 : tempFocus - 1;
                setFocus(tempFocus);
                refs[tempFocus].scrollIntoView(false);
                break;
            case 40:
                e.preventDefault();
                tempFocus = tempFocus + 1 >= refs.length - 1 ? 0 : tempFocus + 1;
                setFocus(tempFocus);
                refs[tempFocus].scrollIntoView(false);
                break;
            case 13:
                if (focus !== -1) {
                    handleSelect(refs[tempFocus].textContent);
                    setShow(false);
                    setFocus(-1);
                }
                break;
            }
        };

        if (parentRef) {
            parentRef.addEventListener('keydown', handleKeyDown);
            return () => {
                parentRef.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [parentRef, items, focus]);

    /**
     * bind click event listener
     */
    useClickOutside(parentRef, onClickOutside);

    return (
        <AutoCompleteContainer show={show}>
            {items || <div />}
        </AutoCompleteContainer>
    );
};

AutoComplete.propTypes = {
    value: PropTypes.string,
    handleSelect: PropTypes.func,
    setNoBlurValidation: PropTypes.func,
    parentRef: PropTypes.object,
    domains: PropTypes.array
};

export default AutoComplete;
