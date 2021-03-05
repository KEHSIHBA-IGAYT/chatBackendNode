const configJs = require('./config.js').config;
const configJson = JSON.parse(JSON.stringify(configJs));

module.exports = configJson;