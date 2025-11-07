const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addNotification } = require('../controllers/notification');
// const { authenticate, authorizRole } = require('../middleware');

router
    .route('/')
    .post(addNotification)
    .all(fourOhFiveHandler);
    
// router
//     .route('/')
//     .get(authenticate, authorizRole("super-admin", "admin"), getAllCategory)
//     .all(fourOhFiveHandler);

module.exports = router;