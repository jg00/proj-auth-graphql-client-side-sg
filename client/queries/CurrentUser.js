import gql from "graphql-tag";

export default gql`
  query {
    user {
      id
      email
    }
  }
`;

/* Reference Only

#  query {
#   user{
#     id
#     email
#   }
# }

# mutation Login($email: String, $password: String){
#   login(email: $email, password: $password){
#     id,
#     email
#   }
# }


# mutation {
#     login (email: "test@test.com", password: "password"){
#       email
#     }
#   }

# mutation {
#   signup(email: "test@test.com", password: "password"){
#     email
#   }
# }

# mutation {
#   logout {
#     id
#     email
#   }
# }

*/
