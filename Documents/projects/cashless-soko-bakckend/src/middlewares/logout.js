import db from "../database/models/";
import * as status from "../constants/httpStatusCodes";
import { clearInvalidToken } from "../helpers";

const { Token } = db;

export default async (req, res) => {
    const token = req.headers["access-token"] || req.params.token || null;
    const userId = req.user?.id;

    const savedToken = await Token.bulkCreate([{ token, userId }], { returning: true });

    console.log("saveToken ===>>>", savedToken);

    if (savedToken.errors) {
        return res
            .status(status.HTTP_SERVER_ERROR)
            .json({ errors: "Oops, something went wrong, please try again!" });
    }

    // await Token.destroy({ where: { userId } });

    return res
        .status(status.HTTP_OK)
        .json({ message: "you are successfully logged out" });
};
