import {
    booksCollection,
    authorsCollection,
    bookAuthorsCollection
} from '../db/connect.js';

/** ************************************************
 * Retrieves all books.
 ***************************************************/
const getAllBooks = async () => {
    const books = await booksCollection.aggregate([
        {
            $lookup: {
                from: 'bookAuthors',
                localField: 'id',
                foreignField: 'bookId',
                as: 'bookAuthorRelationships'
            }
        },
        {
            $lookup: {
                from: 'authors',
                localField: 'bookAuthorRelationships.authorId',
                foreignField: 'id',
                as: 'authors'
            }
        },
        {
            $project: {
                bookAuthorRelationships: 0
            }
        }
    ]).toArray();

    return books;
};

/** ************************************************
 * Retrieves a book by its ID.
 ***************************************************/
const getBookById = async (bookId) => {
    const book = await booksCollection.findOne({
        id: bookId
    });

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

    const uniqueAuthorIds = new Set(book.authorIds);

    if (uniqueAuthorIds.size !== book.authorIds.length) {
        return 'duplicate-authors';
    }

    const authors = await authorsCollection
        .find({
            id: { $in: book.authorIds }
        })
        .toArray();

    if (authors.length !== book.authorIds.length) {
        return 'authors-not-found';
    }

    await booksCollection.insertOne({
        id: book.id,
        title: book.title,
        publicationDate: book.publicationDate
    });

    const relationships = book.authorIds.map((authorId) => {
        return {
            bookId: book.id,
            authorId
        };
    });

    await bookAuthorsCollection.insertMany(relationships);

    return getBookById(book.id);
};

/** ************************************************
 * Updates an existing book.
 ***************************************************/
const updateBook = async (bookId, book) => {
    const existingBook = await booksCollection.findOne({
        id: bookId
    });

    if (!existingBook) {
        return null;
    }

    const uniqueAuthorIds = new Set(book.authorIds);

    if (uniqueAuthorIds.size !== book.authorIds.length) {
        return 'duplicate-authors';
    }

    const authors = await authorsCollection
        .find({
            id: { $in: book.authorIds }
        })
        .toArray();

    if (authors.length !== book.authorIds.length) {
        return 'authors-not-found';
    }

    await booksCollection.updateOne(
        { id: bookId },
        {
            $set: {
                title: book.title,
                publicationDate: book.publicationDate
            }
        }
    );

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