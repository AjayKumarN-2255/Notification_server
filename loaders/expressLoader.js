const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
// const path = require('path');
require('dotenv').config();
const { bodyParserHandler,
    fourOhFourHandler,
    globalErrorHandler
} = require('../shared/error/errorHandler');
const { routerLoader } = require('./routerLoader');

async function expressLoader(app) {

    app.use(cors({
        origin: process.env.FRONT_END_URL,
        credentials: true
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(bodyParserHandler);

    routerLoader(app);

    app.use("/api",fourOhFourHandler);

    // // Serve static files first
    // app.use(express.static(path.join(__dirname, '../../client/dist')));

    // // Catch-all route for React Router
    // app.get(/.*/, (req, res) => {
    //     res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
    // });

    app.use(globalErrorHandler);
}

module.exports = {
    expressLoader
}