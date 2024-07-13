import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/sendMail').post(authController.sendMail);

export default router;