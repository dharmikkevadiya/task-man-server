const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
  likePost,
  unlikePost,
  getTimelinePosts,
} = require("../controllers/posts.js");

//@route    PUT /posts
//@desc     Create post
//@access   PRIVATE
router.post("/posts/", auth, createPost.controller);

//@route    GET /posts
//@desc     Get posts
//@access   PRIVATE
router.get("/posts", auth, getPosts.controller);

//@route    GET /posts/:id
//@desc     Get single post
//@access   PRIVATE
router.get("/posts/:id", auth, getPostById.controller);

//@route    PUT /posts/:id
//@desc     Update post
//@access   PRIVATE
router.put("/posts/:id", auth, updatePost.controller);

//@route    DELETE /posts/:id
//@desc     Delete post
//@access   PRIVATE
router.delete("/posts/:id", auth, deletePost.controller);

//@route    PUT /posts/:id/like
//@desc     Like post
//@access   PRIVATE
router.put("/posts/:id/like", auth, likePost.controller);

//@route    PUT /posts/:id/unlike
//@desc     Unlike post
//@access   PRIVATE
router.put("/posts/:id/unlike", auth, unlikePost.controller);

//@route    GET /posts/timeline
//@desc     Get user timeline posts
//@access   PRIVATE
router.get("/posts/get/timeline", auth, getTimelinePosts.controller);

module.exports = router;
