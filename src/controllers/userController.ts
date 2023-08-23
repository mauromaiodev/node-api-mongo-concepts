import { Request, Response } from "express";
import userService from "../services/userService";

const userController = {
  async getAllUsers(request: Request, response: Response) {
    try {
      const users = await userService.getAllUsers();
      return response.json(users);
    } catch (error) {
      return response.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  async createUser(request: Request, response: Response) {
    const newUserInput = request.body;

    try {
      const newUser = await userService.createUser(newUserInput);
      return response.status(201).json(newUser);
    } catch (error) {
      return response.status(400).json({ error: "Requisição inválida" });
    }
  },
  async updateUser(request: Request, response: Response) {
    const userId = request.params.id;
    const updatedUserInput = request.body;

    try {
      const updatedUser = await userService.updateUser(
        userId,
        updatedUserInput
      );
      if (!updatedUser) {
        return response.status(404).json({ error: "Usuário não encontrado" });
      }
      return response.json(updatedUser);
    } catch (error) {
      return response.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  async deleteUser(request: Request, response: Response) {
    const userId = request.params.id;

    try {
      const deletedUser = await userService.deleteUser(userId);
      if (!deletedUser) {
        return response.status(404).json({ error: "Usuário não encontrado" });
      }
      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

export default userController;
