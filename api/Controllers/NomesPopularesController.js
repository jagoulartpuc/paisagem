const daoNomesPopulares = require("../DAO/nomesPopularesDAO");

class NomesPopularesController {
    static fetchNomesPopulares(query, callback) {
        console.log(callback);

        const orderQuery = NomesPopularesController.constructOrderQuery(query);
        const whereQuery = EspecieController.constructWhereQuery(query);

        return daoEspecie.fetchEspecies(orderQuery, whereQuery, callback);
    }

    static getNomesPopularesByID(req, res, next) {
        daoNomesPopulares.findByID(req.params.id, (error, nomesPopulares) => {
            if (error) {
                res.json(error);
                res.status(400);
            } else {
                res.json(nomesPopulares);
                res.status(200);
            }
        });
    }

    static getNomesPopularesByIDEspecies(req, res, next) {
        daoNomesPopulares.findByEspecie(req.params.id, (error, nomesPopulares) => {
            if (error) {
                res.json(error);
                res.status(400);
            } else {
                res.json(nomesPopulares);
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

        console.log(whereQuery);

        return whereQuery;
    }
} module.exports = NomesPopularesController;