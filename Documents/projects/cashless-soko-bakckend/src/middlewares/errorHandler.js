import errorHandler from "../helpers/errorHandler";

const errorHandlerAsync = (controller) => async (req, res, next) => {
    try {
        const result = await controller(req, res, next);
        return result;
    } catch (err) {
        console.log("error ==>>>", err);
        const error = errorHandler(err);
        return res
            .status(error.code)
            .json({ status: error.code, message: error.message, errors: error.errors });
    }
};

export default errorHandlerAsync;
