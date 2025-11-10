const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addNotification, getUserNotification, snoozeNotification } = require('../controllers/notification');
const { authenticate, authorizRole } = require('../middleware');

router
    .route('/')
    .post(authenticate, authorizRole("super-admin", "admin"), addNotification);

router
    .route('/')
    .get(authenticate, authorizRole("super-admin", "admin"), getUserNotification)
    .all(fourOhFiveHandler);

router
    .route('/snooze/:id')
    .patch(authenticate, authorizRole("super-admin", "admin"), snoozeNotification)
    .all(fourOhFiveHandler);

module.exports = router;