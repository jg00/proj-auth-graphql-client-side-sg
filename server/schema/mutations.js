const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const UserType = require("./types/user_type");
const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, request) {
        return AuthService.signup({ email, password, req: request }); // .signup returns a promise and GraphQL waits for this promise to resovle before sending back the data.
      },
    },

    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout(); // Passport exposes logout() function.
        return user;
      },
    },

    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      },
    },
  },
});

module.exports = mutation;

/* Mutations
  mutation {
    login (email: "test@test.com", password: "password"){
      email
    }
  }

  mutation {
    signup(email: "test@test.com", password: "password"){
      email
    }
  }

  mutation {
    logout {
      email
    }
  }
*/
