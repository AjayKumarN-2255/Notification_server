const { app, Loader } = require('./app');

(async () => {
    Loader();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log("Server running successfully on port", PORT);
    });
})();
