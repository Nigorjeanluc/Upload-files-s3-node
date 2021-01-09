import Joi from "joi";

import * as validate from "../";

const nameValidator = (label) => (value, helpers) => {
    const checkEmail = validate.name({ name: value, required: true, label });
    return checkEmail === true ? true : helpers?.message(checkEmail);
};

const emailValidator = (value, helpers) => {
    const checkEmail = validate.email(value, true);
    return checkEmail === true ? true : helpers?.message(checkEmail);
};

const passwordValidator = (value, helpers) => {
    const checkPassword = validate.password(value, true);
    return checkPassword === true ? true : helpers?.message(checkPassword);
};

export default Joi.object().keys({
    firstName: Joi.string()
        .min(2)
        .custom(nameValidator("First name"))
        .label("First name"),
    lastName: Joi.string().min(2).custom(nameValidator("Last name")).label("Last name"),
    username: Joi.string().min(2).label("Username"),
    email: Joi.string().required().custom(emailValidator),
    phone: Joi.string().required(),
    password: Joi.string().required().custom(passwordValidator)
});
