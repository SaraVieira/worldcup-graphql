const axios = require('axios')

const key = 'd1ca7688bf714bc396a7f69913e88292'

const get = axios.create({
  baseURL: 'http://api.football-data.org/v1/',
  timeout: 1000,
  headers: { 'X-Auth-Token': key }
})

module.exports = get
