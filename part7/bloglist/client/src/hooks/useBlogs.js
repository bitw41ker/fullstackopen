import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';

const useBlogs = () => {
  const {
    data: blogs,
    status,
    error,
  } = useQuery(['blogs'], blogService.getAll);

  return { blogs, status, error };
};

export default useBlogs;
