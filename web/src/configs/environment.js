var env       = process.env.NODE_ENV || 'development'

var environment    = require('./config.json')[env]
export default environment

