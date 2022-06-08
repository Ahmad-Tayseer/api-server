'use strict';

const express = require('express');
const app = express();
const foodRouter = require('./routes/food.route');
const clothesRouter = require('./routes/clothes.route');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use(express.json());
app.use(foodRouter);
app.use(clothesRouter);
app.use('*', notFoundHandler);
app.use(errorHandler);

const start = (PORT) => {
    app.listen(PORT, () => {
        console.log(`server is working and listening on PORT ${PORT}`)
    });
};

module.exports = {
    app: app,
    start: start,
}
