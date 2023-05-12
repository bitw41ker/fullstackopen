import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('<Blog /> renders blog title', () => {
  const blog = {
    title: 'testing',
    author: 'test',
    url: 'localhost',
    likes: 15,
    user: {
      username: 'batman_356',
      name: 'Batman',
      id: '63542fbf4e2a56d26e8d01e6',
    },
    id: '63544dc7041b3cce173e2094',
  };

  render(
    <Blog
      blog={blog}
      user={{ username: 'test' }}
      onLikeClick={() => null}
      onDeleteClick={() => null}
    />
  );

  const title = screen.getByText('testing', { exact: false });

  expect(title).toBeDefined();

  const url = screen.queryByText('localhost');
  expect(url).toBeNull();

  const likes = screen.queryByText('15');
  expect(likes).toBeNull();
});
