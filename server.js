const express = require("express");
const mysql = require("mysql2");
const methodOverride = require('method-override');
const multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();
const createError = require('http-errors');


const uploadRouter = require("./serverParts/routes/uploadRouter");


let app = express();

app.use(multiparty());
app.use(methodOverride());
app.use(express.static(__dirname));

app.use("/data", uploadRouter);

app.use((req, res, next) => {
    next(createError(404))
});

app.use((error, req, res, next) => {
    console.error('Error status: ', error.status);
    console.error('Message: ', error.message);
    console.error(error);
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.status || 500);
    res.send({
        status: error.status,
        message: error.message
    })
});

console.log("server started");
app.listen(9009, 'localhost');