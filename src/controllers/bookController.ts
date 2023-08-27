// controller/bookController.ts

import { Request, Response } from "express";
import { BookInputDTO, BookOutputDTO } from "../dtos/BookDTO";
import Book, { BookType } from "../models/Book";
import bookService from "../services/bookService";

export const createBook = async (
  newBookData: BookInputDTO,
  response: Response
) => {
  try {
    const newBook: BookType = new Book({
      title: newBookData.title,
      author: newBookData.author,
      rentBy: null,
    });

    await newBook.save();

    const bookResponse: BookOutputDTO = {
      _id: newBook._id.toString(),
      title: newBook.title,
      author: newBook.author,
    };

    return response.status(201).json({
      success: true,
      message: "Livro criado com sucesso.",
      book: bookResponse,
    });
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar livro." });
  }
};

export const rentBook = async (
  bookId: string,
  userId: string,
  response: Response
) => {
  try {
    const rentedBook = await bookService.rentBook(bookId, userId);
    if (!rentedBook) {
      return response.status(404).json({ error: "Livro não encontrado." });
    }
    return response.json({
      success: true,
      message: "Livro alugado com sucesso.",
      book: rentedBook,
    });
  } catch (error) {
    return response.status(500).json({ error: "Erro ao alugar livro." });
  }
};

export const returnBook = async (bookId: string, response: Response) => {
  try {
    const returnedBook = await bookService.returnBook(bookId);
    if (!returnedBook) {
      return response.status(404).json({ error: "Livro não encontrado." });
    }
    return response.json({
      success: true,
      message: "Livro devolvido com sucesso.",
      book: returnedBook,
    });
  } catch (error) {
    return response.status(500).json({ error: "Erro ao devolver livro." });
  }
};

export const updateBook = async (
  bookId: string,
  updatedBookData: Partial<BookType>,
  response: Response
) => {
  try {
    const updatedBook = await bookService.updateBook(bookId, updatedBookData);
    if (!updatedBook) {
      return response.status(404).json({ error: "Livro não encontrado." });
    }
    return response.json({
      success: true,
      message: "Livro atualizado com sucesso.",
      book: updatedBook,
    });
  } catch (error) {
    return response.status(500).json({ error: "Erro ao atualizar livro." });
  }
};

export const deleteBook = async (bookId: string, response: Response) => {
  try {
    const deletedBook = await bookService.deleteBook(bookId);
    if (!deletedBook) {
      return response.status(404).json({ error: "Livro não encontrado." });
    }
    return response.json({
      success: true,
      message: "Livro deletado com sucesso.",
      book: deletedBook,
    });
  } catch (error) {
    return response.status(500).json({ error: "Erro ao deletar livro." });
  }
};

export const getAllBooks = async (request: Request, response: Response) => {
  try {
    const books = await bookService.getAllBooks();
    return books.length === 0
      ? response.json({ message: "Não há livros." })
      : response.json(books);
  } catch (error) {
    return response.status(500).json({ error: "Erro ao buscar livros." });
  }
};

export const getRentedBooks = async (request: Request, response: Response) => {
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
};
