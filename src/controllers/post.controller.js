import * as postService from '../services/post.service.js';
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    return res
      .status(200)
      .json(new ApiResponse(200, posts, "Posts retrieved successfully"));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to retrieve posts"));
  }
};

export const getPostById = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await postService.getPostById(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

export const createPost = asyncHandler(async (req, res) => {
  const authorId = req.user.id;
  const postData = req.body;

  const newPost = await postService.createPost(postData, authorId);
  return res
    .status(201)
    .json(new ApiResponse(201, newPost, "Post created successfully"));
});

export const updatePost = (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = postService.updatePost(postId, req.body);
  if (!post) {
    return res.status(404).json({ message: 'Post not found.' });
  }
  res.json(post);
};

export const deletePost = (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const success = postService.deletePost(postId);
  if (!success) {
    return res.status(404).json({ message: 'Post not found.' });
  }
  res.status(204).send();
};

export const patchPost = (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = postService.patchPost(postId, req.body);
  if (!post) {
    return res.status(404).json({ message: 'Post not found.' });
  }
  res.json(post);
};
