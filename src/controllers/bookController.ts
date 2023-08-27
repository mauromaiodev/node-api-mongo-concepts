import { Request, Response } from "express";
import bookService from "../services/bookService";

const bookController = {
  async getAllBooks(request: Request, response: Response) {
    try {
      const books = await bookService.getAllBooks();
      return books.length === 0
        ? response.json({ message: "Não há livros." })
        : response.json(books);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar livros." });
    }
  },

  async createBook(request: Request, response: Response) {
    try {
      const newBook = await bookService.createBook(request.body);
      return response.status(201).json(newBook);
    } catch (error) {
      return response.status(400).json({ error: "Erro ao criar livro." });
    }
  },

  async rentBook(request: Request, response: Response) {
    const { bookId } = request.params;
    const { userId } = request.user!;

    try {
      const rentedBook = await bookService.rentBook(bookId, userId);
      return response.json(rentedBook);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao alugar livro." });
    }
  },

  async returnBook(request: Request, response: Response) {
    const { bookId } = request.params;

    try {
      const returnedBook = await bookService.returnBook(bookId);
      return response.json(returnedBook);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao devolver livro." });
    }
  },

  async updateBook(request: Request, response: Response) {
    const { bookId } = request.params;

    try {
      const updatedBook = await bookService.updateBook(bookId, request.body);
      return response.json(updatedBook);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar livro." });
    }
  },

  async deleteBook(request: Request, response: Response) {
    const { bookId } = request.params;

    try {
      const deletedBook = await bookService.deleteBook(bookId);
      return response.json(deletedBook);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao deletar livro." });
    }
  },

  async getRentedBooks(request: Request, response: Response) {
    try {
      const rentedBooks = await bookService.getRentedBooks();
      return rentedBooks.length === 0
        ? response.json({ message: "Não há livros alugados." })
        : response.json(rentedBooks);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao buscar livros alugados." });
    }
  },
};

export default bookController;
