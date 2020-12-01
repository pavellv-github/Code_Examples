
export const THIS_YEAR = +(new Date().getFullYear());

export const THIS_MONTH = +(new Date().getMonth()) + 1;

export const WEEK_DAYS = [
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вс'
];

export const CALENDAR_MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

export const CALENDAR_MONTHS_FOR_DATE = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
];


export const getStartArray = (date) =>  {
    let dateArr = date.split('-');
    return [dateArr[0], +dateArr[1], +dateArr[2]];
};

// количество отображаемых недель
export const CALENDAR_WEEKS = 6;

/**
 * добавить нужное количество 0 в начало строки - zeroPad(5, 2) => "05"
 * @param value
 * @param length
 * @returns {string}
 */
export const zeroPad = (value, length) => {
    return `${value}`.padStart(length, '0');
};


/**
 * определить количество дней в месяце (28 - 31)
 * @param month
 * @param year
 * @returns {number}
 */
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
    return 33 - new Date(year, month - 1, 33).getDate();
};

/**
 * получить номер первого дня месяца
 * @param month
 * @param year
 * @returns {number}
 */
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
    return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay();
};


/**
 * проверка на валидность даты
 * @param date
 * @returns {boolean|*}
 */
export const isDate = date => {
    const isDate = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !Number.isNaN(date.valueOf());

    return isDate && isValidDate;
};

/**
 * формат даты для показа
 * @param date
 * @returns {*}
 */
export const getDateToShow = (date = new Date()) => {
    if (!isDate(date)) return null;

    return [
        zeroPad(+date.getDate(), 2),
        zeroPad(+date.getMonth() + 1, 2),
        date.getFullYear()
    ].join('.');
};

/**
 * формат даты для показа
 * @param date
 * @returns {*}
 */
export const arrToDate = (arr) => {
    return [
        arr[0],
        zeroPad(arr[1], 2),
        zeroPad(arr[2], 2)
    ].join('-');
};

/**
 * преобразование даты для возврата 12.06.2019 -> 2019-06-12
 * @param strDate
 * @returns {string}
 */
export const convertDate = (strDate) => {
    return strDate.split('.').reverse().join('-');
};


/**
 * получить предыдущий месяц
 * @param month
 * @param year
 * @returns {{month: number, year: number}}
 */
export const getPreviousMonth = (month, year) => {
    const prevMonth = (month > 1) ? month - 1 : 12;
    const prevMonthYear = (month > 1) ? year : year - 1;

    return { month: prevMonth, year: prevMonthYear };
};

/**
 * получить следующий месяц
 * @param month
 * @param year
 * @returns {{month: number, year: *}}
 */
export const getNextMonth = (month, year) => {
    const nextMonth = (month < 12) ? month + 1 : 1;
    const nextMonthYear = (month < 12) ? year : year + 1;

    return { month: nextMonth, year: nextMonthYear };
};

/**
 * сформировать массив чисел (каждое число [YYYY, MM, DD])
 * @param month
 * @param year
 * @returns {*[]}
 */
export default (month = THIS_MONTH, year = THIS_YEAR) => {

    // получим количество дней в нужном месяце
    const monthDays = getMonthDays(month, year);
    // номер в неделе первого дня месяца
    const monthFirstDay = getMonthFirstDay(month, year);


    // сколько дней прошлого месяца показать
    const daysFromPrevMonth = monthFirstDay - 1 < 0 ? 6 : monthFirstDay - 1;
    // сколько дней будущего месяца показать
    let daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + monthDays);

    // получим следующий и прошлый месяца
    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

    // количество дней в прошлом месяце
    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

    // формируем массив чисел за прошлый месяц
    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
        const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
        return [prevMonthYear, prevMonth, day];
    });

    // формируем массив чисел за текущий месяц
    const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
        const day = index + 1;
        return [year, month, day];
    });

    // формируем массив чисел за будущий месяц
    const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
        const day = index + 1;
        return [nextMonthYear, nextMonth, day];
    });

    // собираем общий массив
    return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];

};
