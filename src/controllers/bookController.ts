import { Request, Response } from "express";
import bookService from "../services/bookService";

const bookController = {
  async getAllBooks(request: Request, response: Response) {
    try {
      const books = await bookService.getAllBooks();

      if (books.length === 0) {
        return response.json({ message: "Não há livros." });
      }

      return response.json(books);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar livros." });
    }
  },

  async createBook(request: Request, response: Response) {
    const newBookInput = request.body;

    try {
      const newBook = await bookService.createBook(newBookInput);
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
    const updatedBookData = request.body;

    try {
      const updatedBook = await bookService.updateBook(bookId, updatedBookData);
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

      if (rentedBooks.length === 0) {
        return response.json({ message: "Não há livros alugados." });
      }

      return response.json(rentedBooks);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao buscar livros alugados." });
    }
  },
};

export default bookController;
