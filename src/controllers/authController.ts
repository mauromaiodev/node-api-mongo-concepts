import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import authService from "../services/authService";

const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;

    try {
      const newUser = new User({
        username,
        email,
        password,
        role: "user",
      });

      await authService.registerUser(newUser);
      res.json({ message: "Registro feito com sucesso!" });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
      const token = await authService.loginUser(username, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
