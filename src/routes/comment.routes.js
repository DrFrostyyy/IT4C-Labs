// src/routes/comment.routes.js
import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';

const router = Router();

// GET all comments
router.get('/', commentController.getAllComments);

// GET comments for a specific post
router.get('/posts/:postId/comments', commentController.getCommentsByPostId);

// POST a new comment for a specific post
router.post('/posts/:postId/comments', commentController.createCommentForPost);

export default router;
