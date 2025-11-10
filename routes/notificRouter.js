const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addNotification, getAllNotification } = require('../controllers/notification');
const { authenticate, authorizRole } = require('../middleware');

router
    .route('/')
    .post(authenticate, authorizRole("super-admin", "admin"), addNotification);

router
    .route('/')
    .get(authenticate, authorizRole("super-admin", "admin"), getAllNotification)
    .all(fourOhFiveHandler);

module.exports = router;