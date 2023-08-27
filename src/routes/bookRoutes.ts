import express from "express";
import * as bookController from "../controllers/bookController";
import { BookInputDTO } from "../dtos/BookDTO";
import authenticate from "../middlewares/auth";

const router = express.Router();

router.get("/", authenticate, bookController.getAllBooks);
router.get("/rented", authenticate, bookController.getRentedBooks);
router.post("/", authenticate, (req, res) => {
  const newBookData: BookInputDTO = req.body;
  return bookController.createBook(newBookData, res);
});
router.post("/:bookId/rent", authenticate, (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.user!;
  return bookController.rentBook(bookId, userId, res);
});
router.post("/:bookId/return", authenticate, (req, res) => {
  const { bookId } = req.params;
  return bookController.returnBook(bookId, res);
});
router.put("/:bookId", authenticate, (req, res) => {
  const { bookId } = req.params;
  return bookController.updateBook(bookId, req.body, res);
});
router.delete("/:bookId", authenticate, (req, res) => {
  const { bookId } = req.params;
  return bookController.deleteBook(bookId, res);
});

export default router;
