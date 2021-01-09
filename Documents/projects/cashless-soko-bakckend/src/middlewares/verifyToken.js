import db from '../database/models/';
import { decode } from '../utils/tokens';
import { INVALID_TOKEN, TOKEN_REQUIRED } from '../constants/errorMessages';
import { HTTP_UNAUTHORIZED } from '../constants/httpStatusCodes';
import 'dotenv/config';

const { User } = db;

/**
 * @param {object} req express request
 * @param {object} res express response
 * @returns {number} userid
 */

const auth = async (req, res, next) => {
  let token = req.header('access-token') || req.params.token || null;
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      status: HTTP_UNAUTHORIZED,
      message: TOKEN_REQUIRED
    });
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  try {
    const decoded = decode(token);

    const keys = Object.keys(decoded?.decoded);
    const key = keys[0];

    const { id } = decoded.decoded;

    if (key === 'email' || key === 'iat' || key === 'exp') {
      req.user = decoded;
      return next();
    }

    const user = await User.findOne({ where: { id } });

    if (user?.get()?.id) {
      req.user = user.get();
      return next();
    }

    return res.status(HTTP_UNAUTHORIZED).json({
      status: HTTP_UNAUTHORIZED,
      message: INVALID_TOKEN
    });
  } catch (err) {
    return res.status(HTTP_UNAUTHORIZED).json({
      status: HTTP_UNAUTHORIZED,
      message: INVALID_TOKEN
    });
  }
};

export default auth;
