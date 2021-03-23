import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation CreateUser($name: String, $email: String, $password: String) {
    createUser(name: $name, email: $email, password: $password){
      email
      password
    }
  }
`;