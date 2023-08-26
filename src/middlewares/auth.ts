import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { UserType } from "../models/User";

const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserType & { userId: string };
    }
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Autenticação necessária." });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY) as DecodedToken;
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    req.user = user;
    req.user.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválida." });
  }
};

export default authenticate;
