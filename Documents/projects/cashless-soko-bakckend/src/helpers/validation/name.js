/**
 * @param {args} {name: string; required: boolean; label: string }
 * @returns {boolean|string} true if the name is valid otherwise returns an error message
 */
export default ({ name, required = false, label = "" }) => {
    const re = /[A-Z]{2,4}/gim;
    const reName = /[0-9\\ ,;:"!#$%&'*+/=?^`{|}~([\])]/g;

    return (
        (!name && !required) ||
        (re.test(name) && !reName.test(name)) ||
        (label &&
            `Please provide a valid ${label}, it should only contain alphabetic characters`) ||
        "Please provide a valid name, it should only contain alphabetic characters"
    );
};
