import {
  booksCollection,
  authorsCollection,
  bookAuthorsCollection,
} from "../db/connect.js";

import { authorsExist } from "./bookAuthors.js";

/**

* Retrieves all books with their authors.
  */
const getAllBooks = async () => {
  const books = await booksCollection.find({}).toArray();

  for (const book of books) {
    const relationships = await bookAuthorsCollection
      .find({
        bookId: book.id,
      })
      .toArray();

    const authorIds = relationships.map((relationship) => {
      return relationship.authorId;
    });

    book.authors = await authorsCollection
      .find({
        id: { $in: authorIds },
      })
      .toArray();
  }

  return books;
};

/**

* Retrieves a book by its ID with its authors.
  */
const getBookById = async (bookId) => {
  const book = await booksCollection.findOne({
    id: bookId,
  });

  if (!book) {
    return null;
  }

  const relationships = await bookAuthorsCollection
    .find({
      bookId,
    })
    .toArray();

  const authorIds = relationships.map((relationship) => {
    return relationship.authorId;
  });

  book.authors = await authorsCollection
    .find({
      id: { $in: authorIds },
    })
    .toArray();

  return book;
};

/** *************************************************
 * Creates a new book.
 *****************************************************/
const createBook = async (book) => {
  const existingBook = await booksCollection.findOne({
    id: book.id,
  });

  if (existingBook) {
    return null;
  }

  const validAuthors = await authorsExist(book.authorIds);

  if (!validAuthors) {
    return "authors-not-found";
  }

  await booksCollection.insertOne({
    id: book.id,
    title: book.title,
    publicationDate: book.publicationDate,
  });

  const relationships = book.authorIds.map((authorId) => {
    return {
      bookId: book.id,
      authorId,
    };
  });

  await bookAuthorsCollection.insertMany(relationships);

  return getBookById(book.id);
};

/**

* Updates an existing book.
  */
const updateBook = async (bookId, book) => {
  const existingBook = await booksCollection.findOne({
    id: bookId,
  });

  if (!existingBook) {
    return null;
  }

  const validAuthors = await authorsExist(book.authorIds);

  if (!validAuthors) {
    return "authors-not-found";
  }

  await booksCollection.updateOne(
    { id: bookId },
    {
      $set: {
        title: book.title,
        publicationDate: book.publicationDate,
      },
    },
  );

  await bookAuthorsCollection.deleteMany({
    bookId,
  });

  const relationships = book.authorIds.map((authorId) => {
    return {
      bookId,
      authorId,
    };
  });

  await bookAuthorsCollection.insertMany(relationships);

  return getBookById(bookId);
};

/**

* Deletes a book by its ID.
  */
const deleteBook = async (bookId) => {
  const result = await booksCollection.deleteOne({
    id: bookId,
  });

  if (result.deletedCount === 0) {
    return null;
  }

  await bookAuthorsCollection.deleteMany({
    bookId,
  });

  return true;
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
