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

export const DELETE_ORDER = gql`
  mutation DeleteOrder($number: String) {
    deleteOrder(number: $number) {
      deletedCount
    }
  }
`;
