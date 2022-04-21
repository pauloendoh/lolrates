import { GraphQLClient } from "graphql-request";

// https://youtu.be/ZZrr82beJQk?t=546
const myGraphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_URL);

export default myGraphQLClient;
