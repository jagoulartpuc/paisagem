const constants = require('../config/contants')
const db        = require('../models')

const classificacoes = db.sequelize.model('Classificacoes')

/*
 * Fetch a specific classificacoes page
 */
function fetchClassificacoes(orderQuery, whereQuery, callback) {
    classificacoes.findAll({
        attributes: { exclude: ['password', 'salt'] },
        order:  (createOrderClause(orderQuery)),
        where:  (createWhereClause(whereQuery))
    })
        .then(classificacoes => {
            callback(null, classificacoes)
        })
        .catch(error => {
            let errorObj = { statusDesc: error, statusCode: constants.errorCodeSequelize }
            callback(errorObj, null)
        })
}

function findByID(id_classificacao, callback) {
    classificacoes.findById( id_classificacao, {
        attributes: { }
    })
        .then(classificacao => {
            if(classificacao) {
                return callback(null, classificacao)
            } else {
                let errorObj = { statusDesc: constants.valueNotFound, statusCode: constants.errorCodeSequelize }
                return callback(errorObj, null)
            }
        })
        .catch(error => {
            let errorObj = { statusDesc: error, statusCode: constants.errorCodeSequelize }
            return callback(errorObj, null)
        })
}

function findByNome(nome, callback) {
    classificacoes.findById( nome, {
        attributes: { }
    })
        .then(classificacao => {
            if(classificacao) {
                return callback(null, classificacao)
            } else {
                let errorObj = { statusDesc: constants.valueNotFound, statusCode: constants.errorCodeSequelize }
                return callback(errorObj, null)
            }
        })
        .catch(error => {
            let errorObj = { statusDesc: error, statusCode: constants.errorCodeSequelize }
            return callback(errorObj, null)
        })
}

function addClassificacao(classificacao, callback) {
    classificacoes.create(classificacao)
        .then(newClassificacao => {
            delete newClassificacao.dataValues.password
            delete newClassificacao.dataValues.salt
            
            callback(null, newClassificacao)
        })
        .catch(error => {
            let errorObj = { statusDesc: error, statusCode: constants.errorCodeSequelize }
            callback(errorObj, null)
        })
}

function updateClassificacao(newClassificacaoData, callback) {
    classificacoes.findById(newClassificacaoData.id_classificacao)
        .then(classificacao => {
            if(classificacao == null) {
                let errorObj = { statusDesc: constants.valueNotFound, statusCode: constants.errorCodeSequelize }
                callback(errorObj, null)
            } else {
                classificacao.update(newClassificacaoData, {
                    returning: true
                })
                    .then(instance => {
                        callback(null, instance)
                    })
            }
        })
        .catch(error => {
        let errorObj = { statusDesc: error, statusCode: constants.errorCodeSequelize }
            callback(errorObj, null)
        })
}

function deleteClassificacaoBy(id_classificacao, callback) {
    classificacoes.findById(id_classificacao)
        .then(classificacao => {
            if(classificacao == null) {
                let errorObj = { statusDesc: constants.valueNotFound, statusCode: constants.errorCodeSequelize }
                callback(errorObj, null)
            } else {
                classificacao.destroy({ returning: true })
                    .then(instance => {
                        callback(null, instance)
                    })
            }
        })
        .catch(error => {
            let errorObj = { statusDesc: error, statusCode: constants.errorCodeSequelize }
            callback(errorObj, null)
        })
}

function createOrderClause(query) {  
    return [query.model === undefined? [query.field, query.isAscending] : [db[query.model], query.field, query.isAscending]]
}

function createWhereClause(query) {
    if(query.contains !== undefined){
        query.$or = [
            { id_classificacao:       { like: `%${query.contains}%` }},
            { nome_cientifico:     { like: `%${query.contains}%` }},
            { nome_popular: { like: `%${query.contains}%` }},
            { naturalidade:    { like: `%${query.contains}%` }},
            { porte:    { like: `%${query.contains}%` }},
            { genero:    { like: `%${query.contains}%` }},
            { populacao:    { like: `%${query.contains}%` }}
        ]
    }
    delete query.contains

    return query
}

module.exports.fetchClassificacoes   = fetchClassificacoes
module.exports.findByID     = findByID
module.exports.findByNome = findByNome
module.exports.addClassificacao     = addClassificacao
module.exports.deleteClassificacaoBy = deleteClassificacaoBy
module.exports.updateClassificacao   = updateClassificacao
