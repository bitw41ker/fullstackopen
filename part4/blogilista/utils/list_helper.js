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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
