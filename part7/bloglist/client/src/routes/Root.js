import ProtectedRoute from './ProtectedRoute';
import App from '../components/App';

const Root = () => {
  return (
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  );
};

export default Root;
