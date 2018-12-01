const express = require("express");
var ResponseHelper = require("../Helpers/ResponseHelper");
const especieController = require("../Controllers/EspecieController");

const routerEspecie = express.Router();

routerEspecie.post("/", especieController.addEspecie);

routerEspecie.get("/:id", (req, res) => {
  especieController.getEspecieByID(req, res);
});
//Fetch Routes
routerEspecie.get("/", (req, res) => {
  especieController.fetchEspecies(req.query, (error, data) => {
    res.json(ResponseHelper.createResponse(error, data, true));
  });
});


module.exports = routerEspecie;
