import db from "../database/models/";

const { Token } = db;

/**
 * @param {int} userId
 * @return {integer} the number of destroyed tokens
 */
export default async (userId) => {
    const destroyedToken =
        typeof userId === "number"
            ? await Token.destroy({ where: { userId }, truncate: true })
            : 0;
    return !destroyedToken.errors ? destroyedToken : null;
};
