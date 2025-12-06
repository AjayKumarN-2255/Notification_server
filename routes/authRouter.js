const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { Login, refreshToken, Logout, editDetails } = require('../controllers/auth');

router
    .route('/login')
    .post(Login)
    .all(fourOhFiveHandler);

router
    .route('/edit-details/:id')
    .put(editDetails)
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