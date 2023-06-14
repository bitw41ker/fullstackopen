import React, { useRef } from 'react';
import { Form } from 'react-router-dom';

const CreateNew = (props) => {
  const formRef = useRef();

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form ref={formRef} method="post" action="/">
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
        <button type="button" onClick={() => formRef.current.reset()}>
          reset
        </button>
      </Form>
    </div>
  );
};

export default CreateNew;
