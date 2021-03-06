import { ApolloClient, InMemoryCache } from "@apollo/client";

const myApolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default myApolloClient;
