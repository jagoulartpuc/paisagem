const express = require("express");
var ResponseHelper = require("../Helpers/ResponseHelper");
const NomesPopularesController = require("../Controllers/NomesPopularesController");

const routerNomesPopulares = express.Router();

routerNomesPopulares.get("/:id", (req, res) => {
    NomesPopularesController.getNomesPopularesByIDEspecies(req, res);
  });
  
module.exports = routerNomesPopulares;