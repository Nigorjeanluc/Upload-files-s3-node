import "dotenv/config";
import jwt from "jsonwebtoken";

import { INVALID_TOKEN } from "../constants/errorMessages";

/**
 * @param {object} payload the payload to encode the token
 * @param {object} options the options to encode the token
 * @returns {string} the generated token
 */
export const generate = (payload = {}, options) => {
    try {
        if (
            typeof payload === "number" ||
            payload === null ||
            (typeof payload === "object" && !Object.keys(payload).length)
        ) {
            return null;
        }

        return jwt.sign(
            payload,
            String(process.env.JWT_SECRET_KEY),
            options || { expiresIn: "1d" }
        );
    } catch (error) {
        return null;
    }
};

/**
 * @param {string} token the token to decode
 * @returns {object} the decoded token
 */
export const decode = (token) => {
    try {
        return {
            success: true,
            decoded: jwt.verify(token, String(process.env.JWT_SECRET_KEY))
        };
    } catch (error) {
        return { success: false, error, message: INVALID_TOKEN };
    }
};
