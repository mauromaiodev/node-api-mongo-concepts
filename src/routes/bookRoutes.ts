import express from "express";
import bookController from "../controllers/bookController";
import authenticate from "../middlewares/auth";

const router = express.Router();

router.get("/", authenticate, bookController.getAllBooks);

router.get("/rented", authenticate, bookController.getRentedBooks);

router.post("/:bookId/rent", authenticate, bookController.rentBook);

router.post("/:bookId/return", authenticate, bookController.returnBook);

router.post("/", authenticate, bookController.createBook);

router.put("/:bookId", authenticate, bookController.updateBook);

router.delete("/:bookId", authenticate, bookController.deleteBook);

export default router;
