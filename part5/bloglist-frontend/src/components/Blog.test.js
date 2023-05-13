import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
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

  let container;

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        user={{ username: 'test' }}
        onLikeClick={() => null}
        onDeleteClick={() => null}
      />
    );
  });

  test('renders blog title', () => {
    const title = screen.getByText('testing', { exact: false });
    expect(title).toBeDefined();

    const url = screen.queryByText('localhost');
    expect(url).toBeNull();

    const likes = screen.queryByText('15');
    expect(likes).toBeNull();
  });

  test('renders blog user, url and likes when "View"-button is clicked', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    const title = screen.getByText('testing', { exact: false });
    expect(title).toBeDefined();

    const url = screen.queryByText('localhost');
    expect(url).toBeDefined();

    const likes = screen.queryByText('15');
    expect(likes).toBeDefined();

    const username = screen.queryByText('test');
    expect(username).toBeDefined();
  });
});
