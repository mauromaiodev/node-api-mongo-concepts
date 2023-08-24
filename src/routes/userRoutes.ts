import express from "express";
import userController from "../controllers/userController";
import authenticate from "../middlewares/auth";

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: `Bem vindo ${req.user!.username}` });
});

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
