const { ApolloServerPluginInlineTrace } = require("apollo-server-core");
const { ApolloServer } = require('apollo-server');
const { resolvers, typeDefs } = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginInlineTrace()],
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
})
