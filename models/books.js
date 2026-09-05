import { booksCollection } from '../db/connect.js';

const getAllBooks = async () => {
    const books = await booksCollection.find().toArray();

    return books;
}

export { getAllBooks };