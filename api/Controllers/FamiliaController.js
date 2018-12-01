const daoFamilia = require("../DAO/FamiliasDAO");

class FamiliaController {
  /*  ROTAS DE FETCH:
     *  Todas as rotas de fetch lidam com informações pertinentes a vários usuários
     */

  //Fetch especie
  static fetchFamilias(query, callback) {
    const orderQuery = FamiliaController.constructOrderQuery(query);
    const whereQuery = FamiliaController.constructWhereQuery(query);

    return daoFamilia.fetchFamilias(orderQuery, whereQuery, callback);
  }

  static getFamiliaByID(req, res, next) {
    daoFamilia.findByID(req.params.id, (error, familia) => {
      if (error) {
        res.json(error);
        res.status(400);
      } else {
        res.json(familia);
        res.status(200);
      }
    });
  }
//jjjj
  static addFamilia(req, res, next) {
    daoFamilia.addFamilia(req.body, (error, familia) => {
      if (error) {
        res.json(error);
        res.status(400);
      } else {
        res.json(familia);
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
        orderQuery.field = "nome";
        break;

      default:
        //Default Order Query
        orderQuery.field = "id_familia";
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

module.exports = FamiliaController;
