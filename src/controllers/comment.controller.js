// src/controllers/comment.controller.js
import * as commentService from '../services/comment.service.js';

export const getAllComments = (req, res) => {
    const comments = commentService.getAllComments();
    res.json(comments);
};

export const getCommentsByPostId = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const comments = commentService.getCommentsByPostId(postId);
    res.json(comments);
};

export const createCommentForPost = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Text is required.' });
    }

    const newComment = commentService.createComment(postId, text);
    res.status(201).json(newComment);
};
