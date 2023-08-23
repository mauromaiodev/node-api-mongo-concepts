import express, { Request, Response } from "express";
import mongoose from "mongoose";
import User from "./models/User";

const app = express();

app.use(express.json());

app.get("/users", async (request: Request, response: Response) => {
  const users = await User.find();

  return response.json(users);
});

app.post("/users", async (request: Request, response: Response) => {
  const user = request.body;

  const newUser = await User.create(user);

  return response.json(newUser);
});

app.put("/users/:id", async (request: Request, response: Response) => {
  const userId = request.params.id;
  const updatedUser = request.body;

  const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });

  if (!user) {
    return response.status(404).json({ error: "Usuário não encontrado" });
  }

  return response.json(user);
});

mongoose
  .connect(
    "mongodb+srv://mauromaiodev:4McGOTdr1dbDnW2m@cluster0.yamv0ox.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Banco de dados conectado!"))
  .catch(() => console.log("Não conectou"));

app.listen(3000);
