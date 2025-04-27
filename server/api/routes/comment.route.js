import { Router } from "express";
import { createComment, deleteComment, editComment, getcomments, getPostComments, likeComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.post('/create', verifyToken, createComment);
router.get('/getcomment/:postId', getPostComments);
router.put('/likecomment/:commentId', verifyToken, likeComment);
router.put('/editcomment/:commentId', verifyToken, editComment);
router.delete('/deletecomment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);

export default router;