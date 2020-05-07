
const fs = require("fs");
const User = require("../modules/db").User;
const Source = require('../class/source.class');
const UploadCSV = require('../class/upload-csv.class');
const createError = require('http-errors');

exports.usersAdd = (request, response, next) => {
    if (!request.body) return next(createError(400, "Missing request body"));
    let uploadCSV = new UploadCSV(request, response, next);
    uploadCSV.readFile(request.files.file);
};
exports.getUsersJSON = (request, response, next) => {
    User.findAll({raw:true}).then(users=>{
        users.unshift({
            userName: 'userName',
            firstName: 'firstName',
            lastName: 'lastName',
            age: 'age'
        });
        let readStream = new Source(users, {}, "json");
        readStream.pipe(response);
    }).catch(err=>next(new Error(err)));
};
exports.getUsersCSV = (request, response, next) => {
    User.findAll({raw:true}).then(users=>{
        users.unshift({
            userName: 'userName',
            firstName: 'firstName',
            lastName: 'lastName',
            age: 'age'
        });
        let readStream = new Source(users);
        readStream.pipe(response);
    }).catch(err=>next(createError(500, err.message)));
};