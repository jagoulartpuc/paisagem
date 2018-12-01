const constants = require('../config/contants')
const db        = require('../models')

const familias = db.sequelize.model('Familias')

/*
 * Fetch a specific familias page
 */
function fetchFamilias(orderQuery, whereQuery, callback) {
    familias.findAll({
        attributes: { exclude: ['password', 'salt'] },
        order:  (createOrderClause(orderQuery)),
        where:  (createWhereClause(whereQuery))
    })
        .then(familias => {
            callback(null, familias)
        })
        .catch(error => {
            let errorObj = { statusDesc: error, statusCode: constants.errorCodeSequelize }
            callback(errorObj, null)
        })
}

function findByID(id_familia, callback) {
    familias.findById( id_familia, {
        attributes: { }
    })
        .then(familia => {
            if(familia) {
                return callback(null, familia)
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
    familias.findById( nome, {
        attributes: { }
    })
        .then(familia => {
            if(familia) {
                return callback(null, familia)
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

function addFamilia(familia, callback) {
    familias.create(familia)
        .then(newFamilia => {
            delete newFamilia.dataValues.password
            delete newFamilia.dataValues.salt
            
            callback(null, newFamilia)
        })
        .catch(error => {
            let errorObj = { statusDesc: error, statusCode: constants.errorCodeSequelize }
            callback(errorObj, null)
        })
}

function updateFamilia(newFamiliaData, callback) {
    familias.findById(newFamiliaData.id_familia)
        .then(familia => {
            if(familia == null) {
                let errorObj = { statusDesc: constants.valueNotFound, statusCode: constants.errorCodeSequelize }
                callback(errorObj, null)
            } else {
                familia.update(newFamiliaData, {
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

function deleteFamiliaBy(id_familia, callback) {
    familias.findById(id_familia)
        .then(familia => {
            if(familia == null) {
                let errorObj = { statusDesc: constants.valueNotFound, statusCode: constants.errorCodeSequelize }
                callback(errorObj, null)
            } else {
                familia.destroy({ returning: true })
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
            { id_familia:       { like: `%${query.contains}%` }},
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

module.exports.fetchFamilias   = fetchFamilias
module.exports.findByID     = findByID
module.exports.findByNome = findByNome
module.exports.addFamilia     = addFamilia
module.exports.deleteFamiliaBy = deleteFamiliaBy
module.exports.updateFamilia   = updateFamilia
