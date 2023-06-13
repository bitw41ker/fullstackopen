import { Form } from 'react-router-dom';

const CreateNew = (props) => {
  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form method="post" action="/">
        <div>
          content
          <input name="content" />
        </div>
        <div>
          author
          <input name="author" />
        </div>
        <div>
          url for more info
          <input name="info" />
        </div>
        <button type="submit">create</button>
      </Form>
    </div>
  );
};

export default CreateNew;
