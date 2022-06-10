export const checkValidity = (value, rules) => {
    let isValid = true;

    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
    };

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    };

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    };

    if(rules.email) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    };

    return isValid;
};