import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

// this path: /api/my/user
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.post("/", jwtCheck, jwtParse, MyUserController.updateCurrentUser);
export default router;
