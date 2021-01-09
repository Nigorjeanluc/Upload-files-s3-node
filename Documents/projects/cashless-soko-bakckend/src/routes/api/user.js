import { Router } from 'express';

import errorHandlerAsync from '../../middlewares/errorHandler';
import joiValidator from '../../middlewares/joiValidator';
import * as schema from '../../helpers/validation/joi-schemas';
import UserController from '../../controllers/UserController';
import verifyToken from '../../middlewares/verifyToken';
import verifyAdminUser from '../../middlewares/verifyAdmin';
import checkUserUpdate from '../../middlewares/checkUpdateUser';
import checkUserExist from '../../middlewares/checkUserExist';
import isActiveUserEmail from '../../middlewares/isActiveUserEmail';
import logout from '../../middlewares/logout';
import checkInvalidToken from '../../middlewares/chekInvalidToken';

const router = Router();

// Login User
router.post(
  '/auth/login',
  joiValidator(schema.login),
  isActiveUserEmail,
  errorHandlerAsync(UserController.login)
);

// Create User
router.post('/auth/signup', joiValidator(schema.newUser), errorHandlerAsync(UserController.create));

// Logout User
router.get('/auth/logout', verifyToken, errorHandlerAsync(logout));

// Update User
router.patch(
  '/users/update',
  verifyToken,
  joiValidator(schema.newUser),
  checkUserUpdate,
  errorHandlerAsync(UserController.update)
);

// Display User
router.get('/users/:id', verifyToken, checkInvalidToken, errorHandlerAsync(UserController.getOne));

// Forgot Password
router.post(
  '/auth/forgot-password',
  joiValidator(schema.forgotPassword),
  errorHandlerAsync(UserController.sendEmail)
);

// Update Password
router.patch(
  '/auth/reset-password/:token',
  joiValidator(schema.updatePassword),
  errorHandlerAsync(UserController.updatePassword)
);

// Activate Account
router.get('/auth/activate/:token', verifyToken, errorHandlerAsync(UserController.activate));

// Desactivate Account
router.delete(
  '/users/:id',
  verifyToken,
  checkUserExist,
  errorHandlerAsync(UserController.deactivateAccount)
);

// Update user Role
router.put(
  '/users/:username',
  verifyToken,
  verifyAdminUser,
  errorHandlerAsync(UserController.updateUserRole)
);

export default router;
