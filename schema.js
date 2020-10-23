const { PubSub, gql } = require('apollo-server');

const pubsub = new PubSub();

const POST_ADDED = 'POST_ADDED';

const typeDefs = gql`
  type Subscription {
    postAdded: Post
  }

  type Query {
    posts: [Post]
    other: String
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
  Post: {
    author: () => {
      return new Promise((resolve) =>{
        setTimeout(() => resolve('author'), 1000)
      })
    },
    comment: () => {
      return new Promise((resolve) =>{
        setTimeout(() => resolve('comment'), 10000)
      })
    }
  },

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
    other: () => {
      return new Promise((resolve) =>{
        setTimeout(() => resolve('other'), 500)
      })
    }
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