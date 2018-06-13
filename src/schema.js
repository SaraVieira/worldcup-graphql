module.exports = `
  type Query {
    info: Info
    teams(name: String): [Team]!
    players(teamID: Int!): [Player]!
    games(teamID: Int!): [Fixture]!
  }


  type Info {
    caption: String!
    league: String
    year: String
    currentMatchday: Int,
    numberOfMatchdays: Int,
    numberOfTeams: Int,
    numberOfGames: Int,
    lastUpdated: String
  }

  type Player {
    name: String,
    position: String,
    jerseyNumber: Int,
    dateOfBirth: String,
    nationality: String,
    contractUntil: String,
    marketValue: String
  },

  type Result {
    goalsHomeTeam: Int,
    goalsAwayTeam: Int
  }

  type Fixture {
    date: String,
    status: String,
    matchday: Int,
    homeTeamName: String,
    awayTeamName: String,
    result: Result
    odds: String
  }

  type Team {
    id: Int
    name: String!
    code: String
    shortName: String
    squadMarketValue: String
    flag: String
  }
`
