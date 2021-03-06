import * as status from '../constants/httpStatusCodes';
import db from '../database/models/';

const { User } = db;
/**
 * @param {object} req Request to the route
 * @param {object} res Response from Sserver
 * @param {object} next middleware called to pass after success
 * @returns {object} returned response
 */
export default async (req, res, next) => {
  let input = {};
  if (req.body && req.body.email) {
    input.email = req.body.email;
  }

  const checkUser = await User.findOne({ where: { email: input?.email } });

  //  !(req.user && req.user.role === 'admin')

  if (checkUser?.dataValues?.isActive) {
    next();
  } else {
    return res.status(status.HTTP_UNAUTHORIZED).json({
      errors: { account: 'this account is not activated' }
    });
  }
};
