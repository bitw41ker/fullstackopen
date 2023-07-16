import { gql } from '@apollo/client';

const allAuthors = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const allBooks = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

const queries = {
  allAuthors,
  allBooks,
};

export default queries;
