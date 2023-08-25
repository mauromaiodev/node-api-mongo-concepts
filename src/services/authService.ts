import jwt from "jsonwebtoken";
import User, { UserType } from "../models/User";

const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

const authService = {
  async registerUser(newUser: UserType) {
    try {
      const user = new User(newUser);
      await user.save();
    } catch (error) {
      throw new Error("Erro ao registrar o usuário.");
    }
  },

  async loginUser(username: string, password: string) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        throw new Error("Senha incorreta!");
      }

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "1 hour",
      });
      return token;
    } catch (error) {
      throw new Error("Erro ao iniciar sessão.");
    }
  },
};

export default authService;
