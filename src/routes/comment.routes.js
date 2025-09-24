import { Router } from "express";
import * as commentController from "../controllers/comment.controller.js";
import { validateComment } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/comments", commentController.getAllComments);
router.get("/posts/:postId/comments", commentController.getCommentsByPostId);
router.post(
  "/posts/:postId/comments",
  validateComment,
  commentController.createCommentForPost
);

export default router;
