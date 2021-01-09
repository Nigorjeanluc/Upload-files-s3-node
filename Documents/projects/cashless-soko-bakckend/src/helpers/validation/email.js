/**
 * @param {string} input
 * @param {boolean} required
 * @returns {boolean|string} true if the email is valid otherwise an error message
 */
export default (input, required = false) => {
    if (!input && !required) {
        return true;
    }

    const re = /[A-Z0-9]+@[A-Z0-9-]+\.[A-Z]{2,4}/gim;
    const reUsername = /[\\ ,;:"!#$%&'*+/=?^`{|}~([\])]/g;
    const reDomainSLD = /[ \\,;:"!#$%&'*+/=?^`{|}~([\])]/g;
    const reDomainTLD = /[\d+ \\,;:"!#$%&'*+-/=?^_`{|}~([\])]/g;

    const emailUsername = input.substring(0, input.lastIndexOf("@"));
    const emailDomainSLD = input.substring(
        input.lastIndexOf("@") + 1,
        input.lastIndexOf(".")
    );
    const emailDomainTLD = input.substring(input.lastIndexOf(".") + 1);

    const isEmailUsername =
        !emailUsername.match(/^[0-9]/) && !reUsername.test(emailUsername);
    const isEmailDomainSLD =
        !emailDomainSLD.match(/^[0-9]/) && !reDomainSLD.test(emailDomainSLD);
    const isEmailDomainTLD =
        !emailDomainTLD.match(/^[0-9]/) && !reDomainTLD.test(emailDomainTLD);

    if (re.test(input) && isEmailUsername && isEmailDomainSLD && isEmailDomainTLD) {
        return true;
    }

    return "Please provide a valid email address";
};
