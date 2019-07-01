require("dotenv").config();

module.exports = new (require('./src/Client.js'))({
    compress: true,
    autoReconnect: true
}).login();