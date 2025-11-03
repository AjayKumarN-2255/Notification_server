const { APIError } = require('../../shared/error/APIError');
const { STATUS_CODES } = require('../../shared/constants/statusCodes');
const loginSchema = require('../../validators/loginSchema');
const { validateWithSchema } = require('../../utils/schemaValidation');


async function Login(req, res, next) {
    const payload = req.body;
    const error = validateWithSchema(loginSchema, payload);
    if (error) {
        return next(new APIError(STATUS_CODES.BAD_REQUEST, error.details[0].message));
    }

}

module.exports = {
    Login
}