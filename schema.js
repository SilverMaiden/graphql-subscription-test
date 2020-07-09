const { PubSub, gql } = require('apollo-server');

const pubsub = new PubSub();

const POST_ADDED = 'POST_ADDED';

const typeDefs = gql`
  type Subscription {
    postAdded: Post
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    addPost(author: String, comment: String): Post
  }

  type Post {
    author: String
    comment: String
  }
`
const posts = []
const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: () => { 
        return pubsub.asyncIterator([POST_ADDED])
      },
    },
  },
  Query: {
    posts(root, args, context) {
      return posts;
    },
  },
  Mutation: {
    addPost(root, args, context) {
      pubsub.publish(POST_ADDED, { postAdded: args });
      posts.push(args);
      return args
    },
  },
};


module.exports = { resolvers, typeDefs }