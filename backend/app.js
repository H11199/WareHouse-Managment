require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');

const apiRoute = require('./api/api');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoute);

app.listen(8080, () => console.log("Server started at http://localhost:8080"));