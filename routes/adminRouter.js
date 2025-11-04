const express = require('express');
const router = express.Router();
const { fourOhFiveHandler } = require('../shared/error/errorHandler');
const { addAdmin } = require('../controllers/admin');

router
    .route('/')
    .post(addAdmin)
    .all(fourOhFiveHandler);


module.exports = router;