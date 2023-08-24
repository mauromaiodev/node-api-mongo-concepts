import jwt from "jsonwebtoken";
import User from "../models/User";

const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

interface AuthController {
  register: (req: any, res: any, next: any) => Promise<void>;
  login: (req: any, res: any, next: any) => Promise<void>;
}

export const authController: AuthController = {
  async register(req, res, next) {
    const { username, email, password } = req.body;

    try {
      const user = new User({ username, email, password });
      await user.save();
      res.json({ message: "Registro feito com sucesso!" });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "1 hour",
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
