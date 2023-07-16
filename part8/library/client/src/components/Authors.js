import { useQuery, useMutation } from '@apollo/client';
import queries from '../api/queries';

const Authors = (props) => {
  const query = useQuery(queries.allAuthors);
  const [editAuthorBirthYear] = useMutation(queries.editAuthorBirthYear, {
    refetchQueries: [{ query: queries.allAuthors }],
  });

  function handleBirthYearSubmit(e) {
    e.preventDefault();

    const authorName = e.target.authorName.value;
    const authorBorn = Number(e.target.authorBorn.value);

    editAuthorBirthYear({
      variables: { name: authorName, born: authorBorn },
    });

    e.target.reset();
  }

  if (!props.show) {
    return null;
  }

  if (query.loading) {
    return <div>loading...</div>;
  }

  const authors = query.data?.allAuthors;

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />

      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleBirthYearSubmit}>
          <label htmlFor="author-name">Name</label>
          <select id="author-name" name="authorName" type="text">
            <option value="">Select author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="author-born">Born</label>
          <input id="author-born" name="authorBorn" type="number" />
          <br />
          <button type="submit">Update author</button>
        </form>
      </div>
    </>
  );
};

export default Authors;
