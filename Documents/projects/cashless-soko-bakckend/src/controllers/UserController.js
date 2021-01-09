import db from '../database/models/';
import * as status from '../constants/httpStatusCodes';
import * as tokens from '../utils/tokens';
import * as successMessages from '../constants/successMessages';
import * as errorMessages from '../constants/errorMessages';
import * as helper from '../helpers';

const { User } = db;

const { appUrl } = helper.urlHelper.frontend;

/**
 * a class to handle user authentication
 */
export default class UserController {
  /**
   * @description User signup function
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async create(req, res) {
    const { email, firstName, lastName } = req.body;
    const newUser = await User.create(req.body);

    return (
      (await helper.sendMail(req.body.email, 'signup', {
        email,
        firstName,
        lastName
      })) &&
      res.status(status.HTTP_CREATED).json({
        status: status.HTTP_CREATED,
        message: successMessages.SIGN_UP_CREATED,
        user: { ...newUser.get(), password: undefined }
      })
    );
  }

  /**
   * @description - login user function
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user?.get()?.email) {
      return res.status(status.HTTP_NOT_FOUND).json({
        status: status.HTTP_NOT_FOUND,
        message: errorMessages.EMAIL_NOT_FOUND
      });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(status.HTTP_UNAUTHORIZED).json({
        status: status.HTTP_UNAUTHORIZED,
        message: errorMessages.BAD_CREDENTIALS
      });
    }

    const payload = {
      id: user.get().id,
      role: user.get().role,
      username: user.get().username
    };

    const token = tokens.generate(payload);

    return res.status(status.HTTP_OK).json({
      status: status.HTTP_OK,
      message: successMessages.SIGNED_IN,
      user: { ...user.get(), password: undefined },
      token
    });
  }

  /**
   * @description User update function
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async update(req, res) {
    const updateUser = await User.update(req.body, {
      where: { id: req.user?.id },
      returning: true,
      plain: true
    });

    return res.status(status.HTTP_OK).json({
      status: status.HTTP_OK,
      message: successMessages.UPDATED,
      user: { ...updateUser[1].dataValues, password: undefined }
    });
  }

  /**
   * @description method to find one user or company
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return a user or company
   */
  static async getOne(req, res) {
    const id = Number.parseInt(req.params.id, 10);

    const fetchUser = await User.findOne({ where: { id } });

    return fetchUser?.get()
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          user: { ...fetchUser.get(), password: undefined }
        })
      : res.status(status.HTTP_NOT_FOUND).json({ errors: { user: errorMessages.USER_NOT_FOUND } });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the confirmation message
   */
  static async sendEmail(req, res) {
    const { email } = req.body;
    const result = await User.findOne({ where: { email } }); // check if the email exist

    if (result == null) {
      return res.status(status.HTTP_NOT_FOUND).json({
        message: 'Sorry, Email not found..'
      });
    }

    if (Object.keys(result).length <= 0) {
      return res.status(status.HTTP_NOT_FOUND).json({
        errors: 'email not found....'
      });
    }

    await helper.sendMail(email, 'resetPassword', {
      email,
      names: `${result.firstName} ${result.lastName}`
    }); // send mail

    return res.status(status.HTTP_OK).json({
      message: 'Email sent, please check your email'
    });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the confirmation message
   */
  static async updatePassword(req, res) {
    const token = req.body.token || req.params.token;

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(status.BAD_REQUEST).json({ errors: 'Passwords are not matching' });
    }

    if (!req.body.password || !req.body.confirmPassword) {
      return res.status(status.BAD_REQUEST).json({ errors: 'the password can not be empty' });
    }

    const getToken = tokens.decode(token);
    const isUpdated = await User.update(req.body, {
      where: { email: getToken?.decoded?.email },
      returning: true,
      plain: true
    });

    return isUpdated
      ? res.status(status.HTTP_OK).json({
          message: 'Success! your password has been changed.',
          user: { ...isUpdated[1].dataValues, password: undefined }
        })
      : res.status(status.HTTP_NOT_MODIFIED).json({ errors: 'Password not updated' });
  }

  /**
   * @description function to activate user account
   * @param {object} req
   * @param {object} res
   * @returns {object} it return true if account activeted otherwise it return false
   */
  static async activate(req, res) {
    const { user } = req;
    const getUser = await User.update(
      { isActive: true },
      { where: { email: user?.decoded?.email }, returning: true, plain: true }
    );

    console.log('getUser', getUser);

    return res.redirect(`${appUrl}/`);
  }

  /**
   * @description function to delete user
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return true if user deleted or false when user not deleted
   */
  static async deactivateAccount(req, res) {
    const { id } = req.params;
    const deactivateAccount = await User.update({ isActive: false }, { where: { id } });
    return deactivateAccount
      ? res
          .status(status.HTTP_OK)
          .json({ message: 'User account deactivated successfully', userId: id })
      : res.status(status.HTTP_UNAUTHORIZED).json({ errors: 'Unauthorized access' });
  }

  /**
   *  Make a user an admin
   * @param {Object} req express request object
   * @param {Object} res express response object
   * @returns {*} success response
   * @throws {*} error if database error
   */
  static async updateUserRole(req, res) {
    const { role } = req.body;
    const { username } = req.params;

    const user = await User.findOne({ where: { username } });
    console.log('user', user);

    if (user == null) {
      return res
        .status(status.HTTP_NOT_FOUND)
        .json({ message: `This user with the email ${username} does not exist` });
    }
    if ((!user?.errors && !Object.keys(user).length) || user == null) {
      return res
        .status(status.HTTP_NOT_FOUND)
        .json({ message: `This user with the email ${username} does not exist` });
    }
    if (user.role === role) {
      return res.status(status.HTTP_EXIST).send({ message: 'The user already has this role' });
    }
    if (!req.body.role) {
      return res.status(status.HTTP_BAD_REQUEST).send({ message: 'the role can not be empty' });
    }
    const updatedUser = await User.update({ role }, { where: { username } });
    delete updatedUser.password;
    return res.status(status.HTTP_OK).json({
      message: 'roles updated successfully',
      updatedUser
    });
  }
}
