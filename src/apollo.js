import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4001",
  resolvers: {
    // same name with backend type
    // adding local state to every Movie Query type result
    Movie: {
      isLiked: () => false,
    },
    // local state mutation
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        // write data to apollo local state
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked,
          },
        });
      },
    },
  },
});

export default client;
