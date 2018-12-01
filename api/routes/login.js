const express = require("express");
var ResponseHelper = require("../Helpers/ResponseHelper");
var LoginController = require("../Controllers/LoginController");

const routerLogin = express.Router();

routerLogin.post("/", function(req, res) {
  LoginController.login(req.body.username, req.body.password, (error, data) => {
    res.json(ResponseHelper.createResponse(error, data, true));
  });
});

routerLogin.get("/token", function(req, res) {
  LoginController.checkToken(req, res, (error, data) => {
    res.json(ResponseHelper.createResponse(error, data, true));
  });
});

module.exports = routerLogin;
