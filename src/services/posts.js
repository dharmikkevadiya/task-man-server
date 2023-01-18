const User = require("../models/user"); //Database Model
const Post = require("../models/post");
let { MSG } = require("../helper/constant");
const StatusCodes = require("http-status");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

class PostsService {
  async createPost(userId, body) {
    const obj = {
      user: userId,
      desc: body.desc,
      img: body.img,
    };
    const newPost = await new Post(obj).save();

    return newPost;
  }

  async getPosts(params) {
    let posts;
    let query = {};

    if (params.forUser) query.user = params.forUser;

    posts = await Post.find(query);
    if (!posts.length) throw CustomErrorHandler.notFound("Post not found!");
    return posts;
  }

  async getPostById(id) {
    const post = await Post.findById(id);

    if (!post) throw CustomErrorHandler.notFound("Post not found!");
    return post;
  }

  async updatePost(id, userId, body) {
    let post = await Post.findById(id);

    post = await Post.findOneAndUpdate({ _id: id, user: userId }, body, {
      new: true,
    });

    if (!post) throw CustomErrorHandler.notFound("Post not found!");
    return post;
  }

  async deletePost(id, userId) {
    const post = await Post.findOneAndDelete({ _id: id, user: userId });

    if (!post) throw CustomErrorHandler.notFound("Post not found!");
    // const post = await Post.findById(id);

    return post;
  }

  async likePost(id, userId) {
    let post = await Post.findById(id);
    if (!post) throw CustomErrorHandler.notFound("Post not found!");

    if (post.likes.includes(userId))
      throw CustomErrorHandler.badRequest("Post already liked!");

    post.likes.unshift(userId);
    post = await post.save();

    return post;
  }

  async unlikePost(id, userId) {
    let post = await Post.findById(id);
    if (!post) throw CustomErrorHandler.notFound("Post not found!");

    if (!post.likes.includes(userId))
      throw CustomErrorHandler.badRequest("Post has not yet liked!");

    post.likes.splice(post.likes.indexOf(id, 1));
    post = await post.save();

    return post;
  }

  async getTimelinePosts(userId) {
    let user = await User.findById(userId);
    const userPosts = await Post.find({ user: userId });

    const friendPosts = await Promise.all(
      user.following.map((friendId) => {
        return Post.find({ user: friendId });
      })
    );

    return userPosts.concat(...friendPosts);
  }
}

module.exports = PostsService;
