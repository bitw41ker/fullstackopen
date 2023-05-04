import Blog from './Blog';

export default function Blogs({ blogs, user, onLikeClick, onDeleteClick }) {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
            blog={blog}
            user={user}
          />
        ))}
    </div>
  );
}
