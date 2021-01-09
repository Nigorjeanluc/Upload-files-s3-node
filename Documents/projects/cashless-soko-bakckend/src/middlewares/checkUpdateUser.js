import db from "../database/models/";
import * as status from "../constants/httpStatusCodes";
import * as errorMessages from "../constants/errorMessages";

const { User } = db;

export default async (req, res, next) => {
    let [isEmailUsed, isSameOldEmail] = [false, false];
    req.changeEmail = { newEmail: "", message: "" };

    if (req.body.email) {
        const findUser = await User.findOne({ where: { email: req.body.email } });

        if (findUser == null) {
            next();
        }

        if (!findUser.errors && Object.keys(findUser).length > 0) {
            isEmailUsed = req.user.id !== findUser.id;
            isSameOldEmail = req.body.email === findUser.email;
        }
        if (!isSameOldEmail) {
            req.changeEmail.newEmail = req.body.email;
        }
        delete req.body.email;
    }

    return (
        (isEmailUsed &&
            res
                .status(status.HTTP_EXIST)
                .json({ errors: { email: errorMessages.EMAIL_ALREADY_USED } })) ||
        next()
    );
};
