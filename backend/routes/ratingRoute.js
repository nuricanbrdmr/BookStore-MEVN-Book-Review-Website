import express from "express";
import * as ratingController from "../controllers/ratingController.js";
import { authenticateUser } from "../middleWares/authMiddleWare.js";
const router = express.Router();

router.route('/book/:id').get(ratingController.getRatingForBook);
router.route('/:id')
    .put(authenticateUser, ratingController.updateTheRating);
router.route('/').post(authenticateUser, ratingController.createARate);

export default router;