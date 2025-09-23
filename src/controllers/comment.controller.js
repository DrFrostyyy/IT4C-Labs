// src/controllers/comment.controller.js
import * as commentService from '../services/comment.service.js';
import asyncHandler from 'express-async-handler';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getAllComments = asyncHandler(async (req, res) => {
    const comments = await commentService.getAllComments();
    res.status(200).json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
});

export const createCommentForPost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Text is required.' });
    }

    const newComment = await commentService.createComment(postId, text);
    res.status(201).json(new ApiResponse(201, newComment, 'Comment created successfully'));
});
