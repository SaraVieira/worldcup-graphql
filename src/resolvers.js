const network = require('../utils/requests')
const cache = require('../utils/cache')

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

module.exports = {
  Query: {
    players: (_, { teamID }) => getPlayers(teamID),
    games: (_, { teamID }) => getGames(teamID),
    teams: async () => {
      const teams = await getTeams()

      return teams.map(async t => {
        try {
          const id = t._links.self.href.split('/teams/')[1]
          const players = await getPlayers(id)
          const fixtures = await getGames(id)
          t.id = id
          t.flag = t.crestUrl
          t.players = players.data.players
          t.games = fixtures.data.fixtures
        } catch (e) {
          console.log(e)
        }
        return t
      })
    }
  }
}
