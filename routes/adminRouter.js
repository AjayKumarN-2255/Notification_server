const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addAdmin, getAllAdmins } = require('../controllers/admin');
const { authenticate, authorizRole } = require('../middleware');

router
    .route('/')
    .post(authenticate, authorizRole('super-admin'), addAdmin)

router
    .route('/')
    .get(authenticate, authorizRole('super-admin', 'admin'), getAllAdmins)
    .all(fourOhFiveHandler);


module.exports = router;