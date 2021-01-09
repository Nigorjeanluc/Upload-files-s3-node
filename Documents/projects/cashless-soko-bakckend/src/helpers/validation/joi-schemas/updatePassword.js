import Joi from "joi";

import * as validate from "../";

const passwordValidator = (value, helpers) => {
    const checkPassword = validate.password(value, true);
    return checkPassword === true ? true : helpers?.message(checkPassword);
};

export default Joi.object().keys({
    password: Joi.string().required().custom(passwordValidator),
    confirmPassword: Joi.string().required().custom(passwordValidator)
});
