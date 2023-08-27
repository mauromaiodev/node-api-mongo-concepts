import express from "express";
import { BookController } from "../controllers/bookController";
import authenticate from "../middlewares/auth";

const router = express.Router();
const bookController = new BookController();

router.get("/", authenticate, bookController.getAllBooks.bind(bookController));
router.get(
  "/rented",
  authenticate,
  bookController.getRentedBooks.bind(bookController)
);
router.get(
  "/:bookId",
  authenticate,
  bookController.getBookById.bind(bookController)
);
router.post(
  "/:bookId/rent",
  authenticate,
  bookController.rentBook.bind(bookController)
);
router.post(
  "/:bookId/return",
  authenticate,
  bookController.returnBook.bind(bookController)
);
router.post("/", authenticate, bookController.createBook.bind(bookController));
router.put(
  "/:bookId",
  authenticate,
  bookController.updateBook.bind(bookController)
);
router.delete(
  "/:bookId",
  authenticate,
  bookController.deleteBook.bind(bookController)
);

export default router;
