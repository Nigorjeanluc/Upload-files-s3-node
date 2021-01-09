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
  if (req.params && req.params.id) {
    input.id = req.params.id;
  }

  const findUser = await User.findOne({ where: { id: input?.id } });

  if (findUser == null) {
    return res.status(status.HTTP_UNAUTHORIZED).json({
      errors: {
        account: `user "${input.email || input.id || input.username}" does not exist`
      }
    });
  }

  console.log('findUser', findUser);
  if (Object.keys(findUser?.dataValues).length > 0) {
    next();
  }
};
