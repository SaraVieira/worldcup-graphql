const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./src/resolvers')
const typeDefs = require('./src/schema')

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log('Server is running on localhost:4000'))
