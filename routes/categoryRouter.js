const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addCategory, getAllCategory } = require('../controllers/category');
const { authenticate, authorizRole } = require('../middleware');

router
    .route('/')
    .post(authenticate, authorizRole("super-admin", "admin"), addCategory);

router
    .route('/')
    .get(authenticate, authorizRole("super-admin", "admin"), getAllCategory)
    .all(fourOhFiveHandler);

module.exports = router;