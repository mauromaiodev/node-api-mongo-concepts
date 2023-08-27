import { Request, Response } from "express";
import bookService from "../services/bookService";

interface BookAction {
  execute(bookId: string, userId: string, response: Response): Promise<void>;
}

class RentBookAction implements BookAction {
  async execute(
    bookId: string,
    userId: string,
    response: Response
  ): Promise<void> {
    try {
      const rentedBook = await bookService.rentBook(bookId, userId);
      if (!rentedBook) {
        response.status(404).json({ error: "Livro não encontrado." });
        return;
      }

      response.json({
        success: true,
        message: "Livro alugado com sucesso.",
        book: rentedBook,
      });
    } catch (error) {
      response.status(500).json({ error: "Erro ao alugar livro." });
    }
  }
}

class ReturnBookAction implements BookAction {
  async execute(
    bookId: string,
    userId: string,
    response: Response
  ): Promise<void> {
    try {
      const returnedBook = await bookService.returnBook(bookId);
      if (!returnedBook) {
        response.status(404).json({ error: "Livro não encontrado." });
        return;
      }

      response.json({
        success: true,
        message: "Livro devolvido com sucesso.",
        book: returnedBook,
      });
    } catch (error) {
      response.status(500).json({ error: "Erro ao devolver livro." });
    }
  }
}

export class BookController {
  private rentBookAction: BookAction = new RentBookAction();
  private returnBookAction: BookAction = new ReturnBookAction();

  async rentBook(request: Request, response: Response): Promise<Response> {
    const { bookId } = request.params;
    const { userId } = request.user!;

    await this.rentBookAction.execute(bookId, userId, response);
    return response;
  }

  async returnBook(request: Request, response: Response): Promise<Response> {
    const { bookId } = request.params;

    await this.returnBookAction.execute(bookId, request.user!.userId, response);
    return response;
  }

  async getAllBooks(request: Request, response: Response): Promise<Response> {
    try {
      const books = await bookService.getAllBooks();
      return books.length === 0
        ? response.json({ message: "Não há livros." })
        : response.json(books);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar livros." });
    }
  }

  async getBookById(request: Request, response: Response): Promise<Response> {
    const { bookId } = request.params;

    try {
      const book = await bookService.getBookById(bookId);
      if (!book) {
        return response.status(404).json({ error: "Livro não encontrado." });
      }

      return response.json(book);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao buscar livro." });
    }
  }

  async createBook(request: Request, response: Response): Promise<Response> {
    try {
      const newBook = await bookService.createBook(request.body);
      return response.status(201).json(newBook);
    } catch (error) {
      return response.status(400).json({ error: "Erro ao criar livro." });
    }
  }

  async updateBook(request: Request, response: Response): Promise<Response> {
    const { bookId } = request.params;

    try {
      const updatedBook = await bookService.updateBook(bookId, request.body);
      return response.json(updatedBook);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar livro." });
    }
  }

  async deleteBook(request: Request, response: Response): Promise<Response> {
    const { bookId } = request.params;

    try {
      const deletedBook = await bookService.deleteBook(bookId);
      return response.json(deletedBook);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao deletar livro." });
    }
  }

  async getRentedBooks(
    request: Request,
    response: Response
  ): Promise<Response> {
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
  }
}
