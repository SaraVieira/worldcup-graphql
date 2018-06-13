const { getPlayers, getGames, getTeams } = require('../utils/requests')

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
      const teams = await await getTeams()
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
