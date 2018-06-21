const get = require('./axios')

module.exports.getPlayers = (teamID) => get(`teams/${teamID}/players`)
module.exports.getGames = (teamID) => get(`teams/${teamID}/fixtures`)
module.exports.getFixtures = () => get('competitions/467/fixtures')
module.exports.getTeams = () => get('competitions/467/teams')
