'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_USER: '"https://jsonplaceholder.typicode.com"',
  API_RESERVATION: '"https://my-json-server.typicode.com/alunardi/agenda-consulta"'
})
