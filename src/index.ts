import dotenv from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/auth", authRoutes);

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
