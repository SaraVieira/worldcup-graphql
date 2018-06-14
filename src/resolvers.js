const network = require('../utils/requests')
const cache = require('../utils/cache')
const { pipe } = require('../utils/functional')

const getPlayers = async teamID => {
  const cacheKey = `players-${teamID}`

  if (cache.contains(cacheKey)) {
    return cache.get(cacheKey)
  } else {
    const response = await network.getPlayers(teamID)
    cache.set(cacheKey, response.data.players)
    return response.data.players
  }
}

const getGames = async teamID => {
  const cacheKey = `games-${teamID}`

  if (cache.contains(cacheKey)) {
    return cache.get(cacheKey)
  } else {
    const response = await network.getGames(teamID)
    cache.set(cacheKey, response.data.fixtures)
    return response.data.fixtures
  }
}

const getTeams = async () => {
  const cacheKey = 'teams'

  if (cache.contains(cacheKey)) {
    return cache.get(cacheKey)
  } else {
    const response = await network.getTeams()
    cache.set(cacheKey, response.data.teams)
    return response.data.teams
  }
}

const filterTeams = name => teams =>
  teams.filter(team => (name ? team.name === name : true))

const transformTeams = teams =>
  teams.map(team => ({
    ...team,
    id: team._links.self.href.split('/teams/')[1],
    flag: team.crestUrl
  }))

module.exports = {
  Query: {
    players: (_, { teamID }) => getPlayers(teamID),
    games: (_, { teamID }) => getGames(teamID),
    teams: async (_, { name }) =>
      pipe(
        filterTeams(name),
        transformTeams
      )(await getTeams())
  }
}
