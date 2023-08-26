import mongoose from "mongoose";

export interface BookType extends mongoose.Document {
  title: string;
  author: string;
  rentBy: mongoose.Types.ObjectId | string | null;
}

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    rentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model<BookType>("Book", bookSchema);

export default Book;
