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

const editAuthorBirthYear = gql`
  mutation editAuthorBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

const queries = {
  allAuthors,
  allBooks,
  createBook,
  editAuthorBirthYear,
};

export default queries;
