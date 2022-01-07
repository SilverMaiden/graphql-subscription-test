const { ApolloServer } = require('apollo-server');
const { resolvers, typeDefs } = require('./schema');
const { ApolloServerPluginInlineTrace, ApolloServerPluginLandingPageProductionDefault, ApolloServerPluginLandingPageLocalDefault } = require("apollo-server-core");


console.log('honk, ', ApolloServerPluginLandingPageProductionDefault)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (connectionParams) => {
      console.log('hello', connectionParams)
    }
  },
  plugins: [
    ApolloServerPluginInlineTrace(),
    ApolloServerPluginLandingPageLocalDefault({
      footer: false,
    })  ],
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  console.log('🚀 Explore your graph at https://studio.apollographql.com/dev')
})
