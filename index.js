const { ApolloServerPluginInlineTrace } = require("apollo-server-core");
const { ApolloServer } = require('apollo-server');
const { resolvers, typeDefs, schema, roots } = require('./schema');

//const { WebSocketServer } = require('ws'); // yarn add ws
const ws = require('ws');
// yarn add ws@7
const WebSocketServer = ws.Server;
const { useServer } = require('graphql-ws/lib/use/ws');

const server = new WebSocketServer({
  port: 4000,
  path: '/graphql',
  
 /*  typeDefs,
  resolvers,
  // cors: false,
  // introspection: false,
  subscriptions: {
    onConnect: (connectionParams) => {
      console.log('hello', connectionParams)
    }
  },
  plugins: [ApolloServerPluginInlineTrace()], */
});

console.log(useServer(
  // from the previous step
  { schema, roots },
  server,
))
//console.log(schema)
console.log(schema, roots)

/* const server = new ApolloServer({
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
}) */
