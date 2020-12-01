export const checkValidate = value => {
    if (!value || value.length < 2) return false;
    return !(/[0-9!"№;%:?*()_+=~[\]`@#$^&{},.<>/|\\']/).test(value);
};
