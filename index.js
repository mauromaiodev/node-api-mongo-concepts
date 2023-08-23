import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();

app.use(express.json());

app.get("/users", async (request, response) => {
  const users = await User.find();

  return response.json(users);
});

app.post("/users", async (request, response) => {
  const user = request.body;

  const newUser = await User.create(user);

  return response.json(newUser);
});

mongoose
  .connect(
    "mongodb+srv://mauromaiodev:4McGOTdr1dbDnW2m@cluster0.yamv0ox.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Banco de dados conectado!"))
  .catch(() => console.log("Não conectou"));

app.listen(3000);
