const constants = require("../config/contants");
const db = require("../models/index");
const nomesPopularesDAO = require('./nomesPopularesDAO');

const especies = db.sequelize.model("Especies");
const nomesPopulares = db.sequelize.model("nomesPopulares");

/*
 * Fetch a specific especies page
 */
function fetchEspecies(orderQuery, whereQuery, callback) {
  especies
    .findAll({
      order: createOrderClause(orderQuery),
      where: createWhereClause(whereQuery)
    })
    .then(especies => {
      callback(null, especies);
    })
    .catch(error => {
      let errorObj = {
        statusDesc: error,
        statusCode: constants.errorCodeSequelize
      };
      callback(errorObj, null);
    });
}

function findByID(id_especie, callback) {
  especies
    .findById(id_especie, {
      attributes: {}
    })
    .then(especie => {
      if (especie) {
        return callback(null, especie);
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

// function findByNomePop(nome_popular, callback) {
//   especies
//     .findById(nome_popular, {
//       attributes: {}
//     })
//     .then(especie => {
//       if (especie) {
//         return callback(null, especie);
//       } else {
//         let errorObj = {
//           statusDesc: constants.valueNotFound,
//           statusCode: constants.errorCodeSequelize
//         };
//         return callback(errorObj, null);
//       }
//     })
//     .catch(error => {
//       let errorObj = {
//         statusDesc: error,
//         statusCode: constants.errorCodeSequelize
//       };
//       return callback(errorObj, null);
//     });
// }

function findByNomeCientifico(nome_cientifico, callback) {
  especies
    .findById(nome_cientifico, {
      attributes: {}
    })
    .then(especie => {
      if (especie) {
        return callback(null, especie);
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

function addEspecie( especie, callback) {

  especies
    .create(especie)
    .then(newEspecie => {
      callback(null, newEspecie);

      if(especie.nomePopular){
        for(let i = 0; i < especie.nomePopular.length; i++){
          let nomePopular = {
            id_especie: newEspecie.id_especie,
            nome: especie.nomePopular[i].nome
          }

          nomesPopularesDAO.addNomePopular(nomePopular, null);
        }
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

function updateEspecie(newEspecieData, callback) {
  especies
    .findById(newEspecieData.id_especies)
    .then(especie => {
      if (especie == null) {
        let errorObj = {
          statusDesc: constants.valueNotFound,
          statusCode: constants.errorCodeSequelize
        };
        callback(errorObj, null);
      } else {
        especie
          .update(newEspecieData, {
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

function deleteEspecieBy(id_especies, callback) {
  especies
    .findById(id_especies)
    .then(especie => {
      if (especie == null) {
        let errorObj = {
          statusDesc: constants.valueNotFound,
          statusCode: constants.errorCodeSequelize
        };
        callback(errorObj, null);
      } else {
        especie.destroy({ returning: true }).then(instance => {
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
//push teste
function createWhereClause(query) {
  if (query.contains !== undefined) {
    query.$or = [
      { id_especies: { like: `%${query.contains}%` } },
      { nome_cientifico: { like: `%${query.contains}%` } },
      { nome_popular: { like: `%${query.contains}%` } },
      { naturalidade: { like: `%${query.contains}%` } },
      { porte: { like: `%${query.contains}%` } },
      { genero: { like: `%${query.contains}%` } },
      { populacao: { like: `%${query.contains}%` } }
    ];
  }
  delete query.contains;

  return query;
}

module.exports.fetchEspecies = fetchEspecies;
module.exports.findByID = findByID;
module.exports.findByNomeCientifico = findByNomeCientifico;
module.exports.addEspecie = addEspecie;
module.exports.deleteEspecieBy = deleteEspecieBy;
module.exports.updateEspecie = updateEspecie;
