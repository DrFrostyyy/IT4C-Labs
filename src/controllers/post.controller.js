import * as postService from '../services/post.service.js';
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await postService.getAllPosts();
  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts retrieved successfully"));
});


export const getPostById = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await postService.getPostById(postId);
  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post retrieved successfully"));
});


export const createPost = asyncHandler(async (req, res) => {
  const authorId = req.user?.id; 
  const postData = req.body;

  if (!authorId) {
    throw new ApiError(401, "Unauthorized: missing user info");
  }

  const newPost = await postService.createPost(postData, authorId);
  return res
    .status(201)
    .json(new ApiResponse(201, newPost, "Post created successfully"));
});


export const updatePost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const updatedPost = await postService.updatePost(postId, req.body);
  if (!updatedPost) throw new ApiError(404, "Post not found");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});


export const deletePost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const deleted = await postService.deletePost(postId);
  if (!deleted) throw new ApiError(404, "Post not found");

  return res
    .status(204)
    .json(new ApiResponse(204, null, "Post deleted successfully"));
});


export const patchPost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const updatedPost = await postService.partiallyUpdatePost(postId, req.body);
  if (!updatedPost) throw new ApiError(404, "Post not found");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});
