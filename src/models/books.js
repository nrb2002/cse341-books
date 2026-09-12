import {
    booksCollection,
    authorsCollection,
    bookAuthorsCollection
} from '../db/connect.js';

/** ************************************************
 * Retrieves all books.
 ***************************************************/
const getAllBooks = async () => {
    const books = await booksCollection.find({}).toArray();

    return books;
};

/** ************************************************
 * Retrieves a book by its ID.
 ***************************************************/
const getBookById = async (bookId) => {
    const book = await booksCollection.findOne({ id: bookId });

    return book;
};

/** ************************************************
 * Creates a new book.
 ***************************************************/
const createBook = async (book) => {
    const existingBook = await booksCollection.findOne({
        id: book.id
    });

    if (existingBook) {
        return null;
    }

    await booksCollection.insertOne({
        id: book.id,
        title: book.title,
        publicationDate: book.publicationDate
    });

    const relationships = book.authorIds.map((authorId) => {
        return { bookId: book.id, authorId };
    });

    await bookAuthorsCollection.insertMany(relationships);

    return getBookById(book.id);
};

/** ************************************************
 * Updates an existing book.
 ***************************************************/
const updateBook = async (bookId, book) => {
    const result = await booksCollection.updateOne(
        { id: bookId },
        {
            $set: {
                title: book.title,
                publicationDate: book.publicationDate
            }
        }
    );

    if (result.matchedCount === 0) {
        return null;
    }

    await bookAuthorsCollection.deleteMany({
        bookId
    });

    const relationships = book.authorIds.map((authorId) => {
        return {
            bookId,
            authorId
        };
    });

    await bookAuthorsCollection.insertMany(relationships);

    return getBookById(bookId);
};

/** ************************************************
 * Deletes a book by its ID.
 ***************************************************/
const deleteBook = async (bookId) => {
    const result = await booksCollection.deleteOne({
        id: bookId
    });

    if (result.deletedCount === 0) {
        return null;
    }

    await bookAuthorsCollection.deleteMany({
        bookId
    });

    return true;
};

export {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};