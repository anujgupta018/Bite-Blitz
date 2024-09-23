import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// this path: /api/my/user
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.post("/", MyUserController.updateCurrentUser);
export default router;
