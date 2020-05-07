
const express = require("express");
const bodyParser = require("body-parser");
const uploadController = require("../controllers/uploadController");
const userRouter = express.Router();

let jsonParser = bodyParser.json();

userRouter.post("/user", jsonParser, uploadController.usersAdd);
userRouter.get("/user.json", jsonParser, uploadController.getUsersJSON);
userRouter.get("/user.csv", jsonParser, uploadController.getUsersCSV);

module.exports = userRouter;