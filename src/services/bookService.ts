import Book, { BookType } from "../models/Book";

const bookService = {
  getAllBooks() {
    return Book.find().populate("rentBy");
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
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { rentBy: userId },
      { new: true }
    );
    return updatedBook ? { rentBy: updatedBook.rentBy } : null;
  },

  async returnBook(bookId: string) {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { rentBy: null },
      { new: true }
    );
    return updatedBook ? { rentBy: updatedBook.rentBy } : null;
  },

  async getRentedBooks() {
    const rentedBooks = await Book.find({ rentBy: { $ne: null } }).populate(
      "rentBy",
      "_id"
    );
    return rentedBooks;
  },

  getBookById(bookId: string): Promise<BookType | null> {
    return Book.findById(bookId).populate("rentBy");
  },
};

export default bookService;
