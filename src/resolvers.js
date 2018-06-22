const network = require('../utils/requests')
const cache = require('../utils/cache')
const { pipe } = require('../utils/functional')
const ROUNDS = require('./rounds')

/*
 *  Fetches players from cache if resource exists,
 *  otherwise from network 
 */
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

/*
 *  Fetches games from cache if resource exists,
 *  otherwise from network 
 */
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

/*
 *  Fetches all fixtures from cache if resource exists,
 *  otherwise from network 
 */
const getFixtures = async () => {
  const cacheKey = `fixtures`

  if (cache.contains(cacheKey)) {
    return cache.get(cacheKey)
  } else {
    const response = await network.getFixtures()
    cache.set(cacheKey, response.data.fixtures)
    return response.data.fixtures
  }
}

/*
 *  Fetches teams from cache if resource exists,
 *  otherwise from network 
 */
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

/* Filters teams by name */
const filterTeams = name => teams =>
  teams.filter(team => (name ? team.name === name : true))

/* Maps teams to a schema-compliant structure */
const transformTeams = teams =>
  teams.map(team => ({
    ...team,
    id: team._links.self.href.split('/teams/')[1],
    flag: team.crestUrl
  }))

/* Map fixtures to schema-compliant structure */
const transformFixtures = fixtures =>
  fixtures.map(fixture => ({
    ...fixture,
    round: ROUNDS[fixture.matchday]
  }))

module.exports = {
  Query: {
    players: (_, { teamID }) => getPlayers(teamID),
    games: async (_, { teamID }) => pipe(transformFixtures)(await getGames(teamID)),
    fixtures: async () => pipe(transformFixtures)(await getFixtures()),
    teams: async (_, { name }) =>
      pipe(
        filterTeams(name),
        transformTeams
      )(await getTeams())
  }
}
