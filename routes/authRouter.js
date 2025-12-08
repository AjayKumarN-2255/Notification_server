const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { Login, refreshToken, Logout, editDetails, changePassword } = require('../controllers/auth');
const { authenticate, authorizRole } = require('../middleware');

router
    .route('/login')
    .post(Login)
    .all(fourOhFiveHandler);

router
    .route('/edit-details/:id')
    .patch(authenticate, authorizRole('super-admin', 'admin'), editDetails)
    .all(fourOhFiveHandler);

router
    .route('/change-password')
    .patch(changePassword)
    .all(fourOhFiveHandler);

router
    .route('/refresh')
    .post(refreshToken)
    .all(fourOhFiveHandler);

router
    .route('/logout')
    .post(Logout)
    .all(fourOhFiveHandler);


module.exports = router;