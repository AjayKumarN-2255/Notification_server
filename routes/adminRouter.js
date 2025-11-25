const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addAdmin, getAllAdmins, editAdmin, deleteAdmin } = require('../controllers/admin');
const { authenticate, authorizRole } = require('../middleware');

router
    .route('/')
    .post(authenticate, authorizRole('super-admin'), addAdmin);

router
    .route('/:id')
    .patch(authenticate, authorizRole('super-admin'), editAdmin);

router
    .route('/:id')
    .delete(authenticate, authorizRole('super-admin'), deleteAdmin);

router
    .route('/')
    .get(authenticate, authorizRole('super-admin', 'admin'), getAllAdmins)
    .all(fourOhFiveHandler);


module.exports = router;