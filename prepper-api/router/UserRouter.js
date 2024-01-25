import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.post("/signout", userController.signout);
router.get("/", userController.getAllUser);
router.get("/:id", userController.getUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

export default router;