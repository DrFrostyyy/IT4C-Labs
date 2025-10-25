import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import { validatePost } from '../middlewares/validator.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', authMiddleware, validatePost, postController.createPost);
router.put('/:id', authMiddleware, validatePost, postController.updatePost);
router.patch('/:id', authMiddleware, postController.patchPost);
router.delete('/:id', authMiddleware, postController.deletePost);

export default router;
