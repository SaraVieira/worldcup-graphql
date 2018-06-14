const axios = require('axios')

const key = process.env.APIKEY || ""

const get = axios.create({
  baseURL: 'http://api.football-data.org/v1/',
  timeout: 1000,
  headers: { 'X-Auth-Token': key }
})

module.exports = get
