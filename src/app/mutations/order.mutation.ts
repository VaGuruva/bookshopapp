import gql from 'graphql-tag';

export const CREATE_ORDER = gql`
  mutation CreateOrder($quantity: String, $book: String, $total: String, $user: String) {
    createOrder(quantity: $quantity, book: $book, total: $total, user: $user) {
        quantity
        total
        book{
            title
        }
        user{
            email
        }
    }
  }
`;