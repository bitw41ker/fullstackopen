const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let mostLikesBlog = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > mostLikesBlog.likes) {
      mostLikesBlog = blog;
    }
  });
  return mostLikesBlog;
};

const mostBlogs = (blogs) => {
  const authors = new Map();
  let mostBlogsAuthor = { author: '', blogs: 0 };

  blogs.forEach((blog) => {
    let blogsCount = authors.get(blog.author);
    if (blogsCount) {
      authors.set(blog.author, blogsCount + 1);
    } else {
      authors.set(blog.author, 1);
    }
  });
  authors.forEach((blogsCount, author) => {
    if (blogsCount > mostBlogsAuthor.blogs) {
      mostBlogsAuthor = { author, blogs: blogsCount };
    }
  });
  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  const authors = new Map();
  let mostlikesAuthor = { author: '', likes: 0 };

  blogs.forEach((blog) => {
    let likesCount = authors.get(blog.author);
    if (likesCount) {
      authors.set(blog.author, likesCount + blog.likes);
    } else {
      authors.set(blog.author, blog.likes);
    }
  });
  authors.forEach((likesCount, author) => {
    if (likesCount > mostlikesAuthor.likes) {
      mostlikesAuthor = { author, likes: likesCount };
    }
  });
  return mostlikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
