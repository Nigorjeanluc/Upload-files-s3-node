import bcrypt from "bcryptjs";

import { SALT_ROUNDS } from "../constants/common";

export const hashPassword = (password, saltRound) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(saltRound ?? SALT_ROUNDS));

export const comparePassword = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);
