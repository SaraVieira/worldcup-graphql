const network = require('../utils/requests')
const cache = require('../utils/cache')

const getPlayers = async teamID => {
  const cacheKey = `players-${teamID}`

  if (cache.contains(cacheKey)) {
    return cache.get(cacheKey)
  } else {
    const players = await network.getPlayers(teamID)
    cache.set(cacheKey, players)
    return players
  }
}

const getGames = async teamID => {
  const cacheKey = `games-${teamID}`

  if (cache.contains(cacheKey)) {
    return cache.get(cacheKey)
  } else {
    const games = await network.getGames(teamID)
    cache.set(cacheKey, games)
    return games
  }
}

const getTeams = async () => {
  const cacheKey = 'teams'

  if (cache.contains(cacheKey)) {
    return cache.get(cacheKey)
  } else {
    const teams = await network.getTeams()
    cache.set(cacheKey, teams)
    return teams
  }
}

module.exports = {
  Query: {
    players: async (_, { teamID }) => {
      const players = await getPlayers(teamID)

      return players.data.players
    },
    games: async (_, { teamID }) => {
      const fixtures = await getGames(teamID)

      return fixtures.data.fixtures
    },
    teams: async () => {
      const teams = await getTeams()

      return teams.data.teams.map(async t => {
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
