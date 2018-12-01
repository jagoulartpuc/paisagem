const constants = require("../config/contants");
const db = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.op;
const nomesPopulares = db.sequelize.model("nomesPopulares");

/*
 * Fetch a specific nomepopulares page
 */
function fetchNomesPopulares(orderQuery, whereQuery, callback) {
  nomesPopulares
    .findAll({
      order: createOrderClause(orderQuery),
      where: createWhereClause(whereQuery)
    })
    .then(nomesPopulares => {
      callback(null, nomesPopulares);
    })
    .catch(error => {
      let errorObj = {
        statusDesc: error,
        statusCode: constants.errorCodeSequelize
      };
      callback(errorObj, null);
    });
}

function findByEspecie(id_especie, callback) {
  nomesPopulares
    .findAll({
      where: { id_especie: id_especie }
    })
    .then(nomesPopulares => {
      callback(null, nomesPopulares);
    })
    .catch(error => {
      let errorObj = {
        statusDesc: error,
        statusCode: constants.errorCodeSequelize
      };
      callback(errorObj, null);
    });
}

function findByNome(nome, callback) {
  nomesPopulares
    .findAll({
      where: { nome: { [Op.like]: "%" + nome + "%" } }
    })
    .then(nomesPopulares => {
      callback(null, nomesPopulares);
    })
    .catch(error => {
      let errorObj = {
        statusDesc: error,
        statusCode: constants.errorCodeSequelize
      };
      callback(errorObj, null);
    });
}

function findByID(id_nomepopular, callback) {
  nomesPopulares
    .findById(id_nomepopular, {
      attributes: {}
    })
    .then(nomepopular => {
      if (nomepopular) {
        return callback(null, nomepopular);
      } else {
        let errorObj = {
          statusDesc: constants.valueNotFound,
          statusCode: constants.errorCodeSequelize
        };
        return callback(errorObj, null);
      }
    })
    .catch(error => {
      let errorObj = {
        statusDesc: error,
        statusCode: constants.errorCodeSequelize
      };
      return callback(errorObj, null);
    });
}

function addNomePopular(nomepopular, callback) {
  nomesPopulares
    .create(nomepopular)
    .then(newNomePopular => {
      callback(null, newNomePopular);
    })
    .catch(error => {
      let errorObj = {
        statusDesc: error,
        statusCode: constants.errorCodeSequelize
      };
      callback(errorObj, null);
    });
}

function updateNomePopular(newNomePopularData, callback) {
  nomesPopulares
    .findById(newNomePopularData.id_nomepopular)
    .then(nomepopular => {
      if (nomepopular == null) {
        let errorObj = {
          statusDesc: constants.valueNotFound,
          statusCode: constants.errorCodeSequelize
        };
        callback(errorObj, null);
      } else {
        nomepopular
          .update(newNomePopularData, {
            returning: true
          })
          .then(instance => {
            callback(null, instance);
          });
      }
    })
    .catch(error => {
      let errorObj = {
        statusDesc: error,
        statusCode: constants.errorCodeSequelize
      };
      callback(errorObj, null);
    });
}

function deleteNomePopularBy(id_nomepopular, callback) {
  nomesPopulares
    .findById(id_nomepopular)
    .then(nomepopular => {
      if (nomepopular == null) {
        let errorObj = {
          statusDesc: constants.valueNotFound,
          statusCode: constants.errorCodeSequelize
        };
        callback(errorObj, null);
      } else {
        nomepopular.destroy({ returning: true }).then(instance => {
          callback(null, instance);
        });
      }
    })
    .catch(error => {
      let errorObj = {
        statusDesc: error,
        statusCode: constants.errorCodeSequelize
      };
      callback(errorObj, null);
    });
}

function createOrderClause(query) {
  return [
    query.model === undefined
      ? [query.field, query.isAscending]
      : [db[query.model], query.field, query.isAscending]
  ];
}

function createWhereClause(query) {
  if (query.contains !== undefined) {
    query.$or = [
      { id_nomepopular: { like: `%${query.contains}%` } },
      { id_especie: { like: `%${query.contains}%` } },
      { nome: { like: `%${query.contains}%` } }
    ];
  }
  delete query.contains;

  return query;
}

module.exports.findByID = findByID;
module.exports.findByNome = findByNome;
module.exports.findByEspecie = findByEspecie;
module.exports.addNomePopular = addNomePopular;
module.exports.updateNomePopular = updateNomePopular;
module.exports.deleteNomePopularBy = deleteNomePopularBy;
module.exports.fetchNomesPopulares = fetchNomesPopulares;
