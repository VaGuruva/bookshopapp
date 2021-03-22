import gql from 'graphql-tag';

export const BOOKS_QUERY = gql`
    {
        books{
            title
            price
            isbn
            authors{
              name
              surname
            }
            publisher{
              name
            }
        }
    }
`;