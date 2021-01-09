import * as status from '../constants/httpStatusCodes';
import db from '../database/models/';

const { User } = db;

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @param {void} next
 * @returns {void}
 */
export default async (req, res, next) => {
  const id = req.user ? req.user.id : 0;
  const requestUser = await User.findOne({ where: { id, role: 'admin' } });

  if (!requestUser) {
    return res.status(status.HTTP_ACCESS_DENIED).json({
      message: 'Permission denied, you are not allowed to perform this action'
    });
  }
  return next();
};
