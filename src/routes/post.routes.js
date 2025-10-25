import { Router } from 'express';
import { validatePost } from '../middlewares/validator.middleware.js';
import * as postController from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.post('/', validatePost, postController.createPost);
router.put('/:id', validatePost, postController.updatePost);
router.patch('/:id', postController.patchPost);
router.post('/', authMiddleware, validatePost, postController.createPost);
export default router;