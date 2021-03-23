import gql from 'graphql-tag';

export const GET_ORDERS_BY_USER = gql`
  query OrderByUser($email: String) {
    orderByUser(email: $email) {
        quantity
        total
        book{
            title
            authors{
                name
            }
        }
    }
  }
`;
