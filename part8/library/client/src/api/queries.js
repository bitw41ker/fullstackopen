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

const createBook = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
    }
  }
`;

const queries = {
  allAuthors,
  allBooks,
  createBook,
};

export default queries;
