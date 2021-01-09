/**
 * @param {string} input
 * @param {boolean} required
 * @returns {boolean|string} true if the password is valid otherwise an error message
 */
export default (input, required = false) => {
    if (!input && required === false) {
        return true;
    }
    if (
        input.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}$/) &&
        input.match(/[ \\,;:"!#$@*%&'+-/=?^_`{|}~]/)
    ) {
        return true;
    }

    return "Your password should have a minimum 8 and maximum of 25 characters, it must include at least one upper case letter, one lower case letter, one numeric digit and one special character (*&^!%$@#)";
};
