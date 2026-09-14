import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../models/books.js";

/**

* Retrieves all books.
  */
const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();

    return res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**

* Retrieves a book by ID.
  */
const getBookByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await getBookById(requestedId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/*************************************************
 * Creates a new book.
 ************************************************  */
const createBookHandler = async (req, res) => {
  const { id, title, publicationDate, authorIds } = req.body;

  if (
    typeof id !== "string" ||
    typeof title !== "string" ||
    typeof publicationDate !== "string" ||
    !Array.isArray(authorIds) ||
    !id.trim() ||
    !title.trim() ||
    !publicationDate.trim() ||
    authorIds.length === 0
  ) {
    return res.status(400).json({
      message: "Invalid book data",
    });
  }

  if (
    authorIds.some((authorId) => {
      typeof authorId !== "string";
    }) ||
    new Set(authorIds).size !== authorIds.length
  ) {
    return res.status(400).json({
      message: "Invalid authorIds",
    });
  }

  try {
    const book = await createBook({
      id,
      title,
      publicationDate,
      authorIds,
    });

    if (book === null) {
      return res.status(400).json({
        message: "Book with this ID already exists",
      });
    }

    if (book === "authors-not-found") {
      return res.status(400).json({
        message: "One or more authors do not exist",
      });
    }

    return res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**

* Updates an existing book.
  */
const updateBookHandler = async (req, res) => {
  const requestedId = req.params.id;

  const { title, publicationDate, authorIds } = req.body;

  if (
    typeof title !== "string" ||
    typeof publicationDate !== "string" ||
    !Array.isArray(authorIds) ||
    !title.trim() ||
    !publicationDate.trim() ||
    authorIds.length === 0
  ) {
    return res.status(400).json({
      message: "Invalid book data",
    });
  }

  if (
    authorIds.some((authorId) => {
      typeof authorId !== "string";
    }) ||
    new Set(authorIds).size !== authorIds.length
  ) {
    return res.status(400).json({
      message: "Invalid authorIds",
    });
  }

  try {
    const book = await updateBook(requestedId, {
      title,
      publicationDate,
      authorIds,
    });

    if (book === null) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (book === "authors-not-found") {
      return res.status(400).json({
        message: "One or more authors do not exist",
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error("Error updating book:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**

* Deletes a book.
  */
const deleteBookHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const book = await deleteBook(requestedId);

    if (book === null) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting book:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
};
