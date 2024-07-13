import express from "express";
import * as userController from "../controllers/userController.js";
import { authenticateUser } from "../middleWares/authMiddleWare.js";


const router = express.Router();

router.route('/updateUser').put(authenticateUser, userController.updateUser);

export default router;