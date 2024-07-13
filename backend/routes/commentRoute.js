import express from "express";
import * as commentController from "../controllers/commentController.js";
import { authenticateUser } from "../middleWares/authMiddleWare.js";
const router = express.Router();

router.route('/book/:id').get(commentController.getCommentsForBook);

router.route('/user/:id').get(authenticateUser, commentController.getCommentsByUser);

router.route('/:id')
    .delete(authenticateUser, commentController.deleteTheComment)
    .put(authenticateUser, commentController.updateTheComment);

router.route('/:id/upvote').post(authenticateUser, commentController.upvoteComment)

router.route('/:id/downvote').post(authenticateUser, commentController.downvoteComment)

router.route('/')
    .get(commentController.getAllComments)
    .post(authenticateUser, commentController.createAComment);

export default router;