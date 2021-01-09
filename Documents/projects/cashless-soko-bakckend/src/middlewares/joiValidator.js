import { HTTP_BAD_REQUEST } from "../constants/httpStatusCodes";
import { BAD_REQUEST } from "../constants/errorMessages";

export default (schema) => async (req, res, next) => {
    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = [];
        error.details.forEach((value) => {
            errors.push({
                key: value.context?.key || value.context?.label,
                type: value.type,
                message: value.message.replace(/"/g, "")
            });
        });
        return res
            .status(HTTP_BAD_REQUEST)
            .json({ status: HTTP_BAD_REQUEST, message: BAD_REQUEST, errors });
    }
    return next();
};
