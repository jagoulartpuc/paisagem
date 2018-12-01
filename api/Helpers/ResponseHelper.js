const constants = require('../config/contants')

class ResponseHelper {
    static createResponse(error, data, shouldNotExtractValues) {
        var json = {}
        if (!error) {
            let newData = shouldNotExtractValues === true? data : data.dataValues
            json = {
                statusCode: constants.successCode,
                statusDesc: constants.successDesc,
                data: newData
            }
        } else {
            json = {
                statusCode: error.statusCode,
                statusDesc: error.statusDesc,
                data: null
            }
        }
        return json
    }
}

module.exports = ResponseHelper