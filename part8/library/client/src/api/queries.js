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

const queries = {
  allAuthors,
};

export default queries;
