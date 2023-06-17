import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateBlogForm from './CreateBlogForm';

describe('<CreateBlogForm />', () => {
  const mockFormSubmit = jest.fn();

  beforeEach(() => {
    render(<CreateBlogForm onFormSubmit={mockFormSubmit} />);
  });

  test('calls "setBlogs"-callback with correct info ', async () => {
    const user = userEvent.setup();

    const newNoteButton = screen.getByText('New note');
    await user.click(newNoteButton);

    const title = screen.getByLabelText('Title:');
    const author = screen.getByLabelText('Author:');
    const url = screen.getByLabelText('URL:');
    const createButton = screen.getByText('Create');

    await user.type(title, 'titleTest');
    await user.type(author, 'authorTest');
    await user.type(url, 'urlTest');
    await user.click(createButton);

    expect(mockFormSubmit.mock.calls[0]).toHaveLength(1);
    expect(mockFormSubmit).toHaveBeenCalledWith({
      title: 'titleTest',
      author: 'authorTest',
      url: 'urlTest',
    });
  });
});
