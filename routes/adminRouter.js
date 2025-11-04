const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addAdmin } = require('../controllers/admin');
const { authenticate } = require('../middleware/authenticate');

router
    .route('/')
    .post(authenticate, addAdmin)
    .all(fourOhFiveHandler);


module.exports = router;