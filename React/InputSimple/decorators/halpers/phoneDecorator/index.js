/**
 * @description This function remove all symbols from string, except numbers.
 * @param {string} value The value for phone number.
 * @return {string}
 */
export const replaceValueForPhone = value => {

    let onlyNumber = (value && value.length) ? value.replace(/\D+/g, '') : '7';

    // проверка на то, что случайно к автоматически добавленой "7", не дописали еще "8";
    if (onlyNumber.indexOf('789') === 0 || onlyNumber.indexOf('788') === 0) onlyNumber = '7' + onlyNumber.substr(2);
    // если удалили весь номер и попытались ввести не с "7";
    if (onlyNumber.length && onlyNumber[0] !== '7') onlyNumber = '7' + onlyNumber;
    onlyNumber = onlyNumber.substr(0, 11);

    return onlyNumber;
};

/**
 * @description This function formatting string as required +7(999)999-99-99
 * @param {string} value The value for phone number.
 * @returns {string}
 */
export const formatValueForPhone = value => {

    const onlyNumber = replaceValueForPhone(value);

    let formattedValue = '';

    for (let i = 0; i < onlyNumber.length; i++) {
        const currentNumeral = onlyNumber[i];
        switch (i) {
        case 0:
            formattedValue += `+${currentNumeral}(`;
            break;
        case 4:
            formattedValue += `)${currentNumeral}`;
            break;
        case 7:
            formattedValue += `-${currentNumeral}`;
            break;
        case 9:
            formattedValue += `-${currentNumeral}`;
            break;
        default:
            formattedValue += currentNumeral;
        }
    }
    return formattedValue;
};
