import express from "express";
import { getAllBooks, createABook, getABook, updateABook, deleteABook, getBooksByUploader } from "../controllers/bookController.js";
import { authenticateUser } from "../middleWares/authMiddleWare.js";
const router = express.Router();

router
    .route('/uploader')
    .get(authenticateUser, getBooksByUploader);

router
    .route('/')
    .get(getAllBooks)
    .post(authenticateUser, createABook);

router
    .route('/:id')
    .get(getABook)
    .put(authenticateUser, updateABook)
    .delete(authenticateUser, deleteABook);

export default router;