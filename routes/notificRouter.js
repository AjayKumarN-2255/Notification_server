const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addNotification, editNotification, getUserNotification, snoozeNotification,
    stopNotification, deleteNotification, getSingleNotification } = require('../controllers/notification');
const { authenticate, authorizRole } = require('../middleware');
router
    .route('/')
    .post(authenticate, authorizRole("super-admin", "admin"), addNotification);

router
    .route('/')
    .get(authenticate, authorizRole("super-admin", "admin"), getUserNotification);

router
    .route('/:id')
    .patch(authenticate, authorizRole("super-admin", "admin"), editNotification);

router
    .route('/single/:id')
    .get(authenticate, authorizRole("super-admin", "admin"), getSingleNotification);

router
    .route('/:id')
    .delete(authenticate, authorizRole("super-admin", "admin"), deleteNotification)
    .all(fourOhFiveHandler);

router
    .route('/snooze/:id')
    .patch(authenticate, authorizRole("super-admin", "admin"), snoozeNotification)
    .all(fourOhFiveHandler);

router
    .route('/stop/:id')
    .patch(authenticate, authorizRole("super-admin", "admin"), stopNotification)
    .all(fourOhFiveHandler);

module.exports = router;