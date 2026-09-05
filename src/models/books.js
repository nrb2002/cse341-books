import { booksCollection } from '../db/connect.js';

const getAllBooks = async () => {
    const books = await booksCollection.find({}).toArray();

    return books;
}

const getBookById = async (bookId) => {
    const book = await booksCollection.findOne({ id: bookId });

    return book;
}

export { getAllBooks, getBookById };