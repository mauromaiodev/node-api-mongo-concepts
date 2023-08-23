import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import User, { UserType } from "./models/User";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/users", async (_: Request, response: Response) => {
  try {
    const users = await User.find();
    return response.json(users);
  } catch (error) {
    return response.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/users", async (request: Request, response: Response) => {
  const newUserInput = request.body as UserType;

  try {
    const newUser = await User.create(newUserInput);
    return response.status(201).json(newUser);
  } catch (error) {
    return response.status(400).json({ error: "Requisição inválida" });
  }
});

app.put("/users/:id", async (request: Request, response: Response) => {
  const userId = request.params.id;
  const updatedUserInput = request.body as Partial<UserType>;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserInput, {
      new: true,
    });

    if (!updatedUser) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    return response.json(updatedUser);
  } catch (error) {
    return response.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.delete("/users/:id", async (request: Request, response: Response) => {
  const userId = request.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }

    return response.status(204).send();
  } catch (error) {
    return response.status(500).json({ error: "Erro interno do servidor" });
  }
});

mongoose
  .connect(
    process.env.MONGO_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  )
  .then(() => console.log("Banco de dados conectado!"))
  .catch((error) => console.log("Erro ao conectar ao banco de dados:", error));

app.listen(3000);
