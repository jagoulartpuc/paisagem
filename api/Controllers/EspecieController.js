const daoEspecie = require("../DAO/EspeciesDAO");

class EspecieController {
  /*  ROTAS DE FETCH:
     *  Todas as rotas de fetch lidam com informações pertinentes a vários usuários
     */

  //Fetch especie
  static fetchEspecies(query, callback) {
    const orderQuery = EspecieController.constructOrderQuery(query);
    const whereQuery = EspecieController.constructWhereQuery(query);

    return daoEspecie.fetchEspecies(orderQuery, whereQuery, callback);
  }

  static getEspecieByID(req, res, next) {
    daoEspecie.findByID(req.params.id, (error, especie) => {
      if (error) {
        res.json(error);
        res.status(400);
      } else {
        res.json(especie);
        res.status(200);
      }
    });
  }

  static addEspecie(req, res, next) {
   
    daoEspecie.addEspecie(req.body, (error, especie) => {
      if (error) {
        res.json(error);
        res.status(400);
      } else {
        res.json(especie);
        res.status(200);
      }
    });
  }

  static constructOrderQuery(query) {
    /**
     * Construct Order Query:
     *
     * isAscending: should the ordering be ascending or descending?
     * field: order by specified field. possible values:
     *  name: nome_cientifico
     */
    let orderQuery = {};

    //Decide isAscending's value. Default is ASC, if false then DESC
    orderQuery.isAscending = query.isAscending === "false" ? "DESC" : "ASC";

    switch (query.sort) {
      case "nome":
        orderQuery.field = "nome_cientifico";
        break;

      default:
        //Default Order Query
        orderQuery.field = "id_especie";
    }

    return orderQuery;
  }

  static constructWhereQuery(query) {
    /**
     * Construct Where Query:
     *
     * Possible query parameters:
     * contains: searches for the string in any one of the table's fields
     */
    let whereQuery = {};
    if (query.contains !== undefined) {
      whereQuery.contains = query.contains;
    }

    return whereQuery;
  }
}

module.exports = EspecieController;
