const STATUS_CODES = {
    // Success
    OK: 200,
    CREATED: 201,

    // Client errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    METHOD_NOT_ALLOWED: 405,

    // Server errors
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
};

module.exports = {
    STATUS_CODES
};