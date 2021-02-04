import { HTTP_EXIST, HTTP_SERVER_ERROR, HTTP_BAD_REQUEST } from '../constants/httpStatusCodes';
import { CONFLICT, UNEXPECTED_ERROR } from '../constants/errorMessages';

/**
 * @param {object} err
 * @returns {object} an object containing descriptive error messages
 */
export default (err = {}) => {
  const errors = [];
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      Object.keys(err.fields).forEach((key) => {
        errors.push({ key, message: `${key} "${err.fields[key]}" ${CONFLICT}` });
      });
      return { code: HTTP_EXIST, message: err.message, errors };
    case 'SequelizeValidationError':
      err.errors.forEach((error) => {
        errors.push({ key: error.path, message: error.message });
      });
      return { code: HTTP_BAD_REQUEST, message: err.message, errors };
    case 'SequelizeBulkRecordError':
      err.errors.errors.forEach((error) => {
        errors.push({ key: error.path, message: error.message });
      });
      return { code: HTTP_BAD_REQUEST, message: err.message, errors };
    default:
      return {
        code: (err.extensions && err.extensions.code) || HTTP_SERVER_ERROR,
        message: err.message || UNEXPECTED_ERROR,
        errors
      };
  }
};
