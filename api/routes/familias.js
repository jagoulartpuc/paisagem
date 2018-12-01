const express = require("express");
var ResponseHelper = require("../Helpers/ResponseHelper");
const familiaController = require("../Controllers/FamiliaController");

const routerFamilia = express.Router();

routerFamilia.post("/", familiaController.addFamilia);

routerFamilia.get("/:id", (req, res) => {
  familiaController.getFamiliaByID(req, res);
});
//Fetch Routes
routerFamilia.get("/", (req, res) => {
  familiaController.fetchFamilias(req.query, (error, data) => {
    res.json(ResponseHelper.createResponse(error, data, true));
  });
});

module.exports = routerFamilia;
