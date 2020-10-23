const { ApolloServerPluginInlineTrace } = require("apollo-server-core");
const { ApolloServer } = require('apollo-server');
const { resolvers, typeDefs } = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: false,
  // introspection: false,
  subscriptions: {
    onConnect: (connectionParams) => {
      console.log('hello', connectionParams)
    }
  },
  plugins: [ApolloServerPluginInlineTrace()],
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  console.log('🚀 Explore your graph at https://studio.apollographql.com/dev')
})
