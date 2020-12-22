const { GraphQLString } = require("graphql");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require("./user_type");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user; // Populated by Passport behind the scenes whenever we authenticate a user
      },
    },
  },
});

module.exports = RootQueryType;

/*
  user field above will be used to check authentication and if user will have access to different routes inside our client application.
*/
