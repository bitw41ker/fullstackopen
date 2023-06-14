import { Outlet, useActionData } from 'react-router-dom';
import { getAnecdotes } from './Anecdotes';
import Menu from './Menu';
import Footer from './Footer';
import Notification from '../components/Notification';

export async function action({ request }) {
  const id = Math.round(Math.random() * 10000);
  const formData = await request.formData();
  const anecdote = Object.fromEntries(formData);
  anecdote.id = id;
  anecdote.votes = 0;

  const anecdotes = getAnecdotes();
  anecdotes.push(anecdote);

  return { notification: `a new anecdote ${anecdote.content} created!` };
}

const Root = () => {
  const actionData = useActionData();

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={actionData?.notification} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
