import gql from 'graphql-tag';

export const BOOKS_QUERY = gql`
    {
        books{
            title
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