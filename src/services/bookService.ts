import Book, { BookType } from "../models/Book";

const bookService = {
  getAllBooks() {
    return Book.find().populate("rentBy", "username");
  },

  createBook(newBook: BookType) {
    return Book.create(newBook);
  },

  async updateBook(bookId: string, updatedBookData: Partial<BookType>) {
    return Book.findByIdAndUpdate(bookId, updatedBookData, { new: true });
  },

  async deleteBook(bookId: string) {
    return Book.findByIdAndDelete(bookId);
  },

  async rentBook(bookId: string, userId: string) {
    return Book.findByIdAndUpdate(bookId, { rentBy: userId }, { new: true });
  },

  async returnBook(bookId: string) {
    return Book.findByIdAndUpdate(bookId, { rentBy: null }, { new: true });
  },

  async getRentedBooks() {
    const rentedBooks = await Book.find({ rentBy: { $ne: null } }).populate(
      "rentBy",
      "username"
    );
    return rentedBooks;
  },
};

export default bookService;
