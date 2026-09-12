import {
authorsCollection,
bookAuthorsCollection
} from '../db/connect.js';

/** ************************************************

* Checks whether all author IDs exist.
  ***************************************************/
  const authorsExist = async (authorIds) => {
  const authors = await authorsCollection
  .find({
  id: { $in: authorIds }
  })
  .toArray();

  return authors.length === authorIds.length;
  };

/** ************************************************

* Retrieves all book-author relationships.
  ***************************************************/
  const getAllBookAuthors = async () => {
  const relationships = await bookAuthorsCollection
  .find({})
  .toArray();

  return relationships;
  };

/** ************************************************

* Retrieves all authors associated with a book.
  ***************************************************/
  const getAuthorsByBookId = async (bookId) => {
  const relationships = await bookAuthorsCollection
  .find({ bookId })
  .toArray();

  return relationships;
  };

/** ************************************************

* Retrieves all books associated with an author.
  ***************************************************/
  const getBooksByAuthorId = async (authorId) => {
  const relationships = await bookAuthorsCollection
  .find({ authorId })
  .toArray();

  return relationships;
  };

/** ************************************************

* Retrieves one book-author relationship.
  ***************************************************/
  const getBookAuthor = async (bookId, authorId) => {
  const relationship = await bookAuthorsCollection.findOne({
  bookId,
  authorId
  });

  return relationship;
  };

/** ************************************************

* Creates a book-author relationship.
  ***************************************************/
  const createBookAuthor = async (bookId, authorId) => {
  const existingRelationship = await getBookAuthor(
  bookId,
  authorId
  );

  if (existingRelationship) {
  return null;
  }

  const relationship = {
  bookId,
  authorId
  };

  await bookAuthorsCollection.insertOne(relationship);

  return relationship;
  };

/** ************************************************

* Creates multiple book-author relationships.
  ***************************************************/
  const createBookAuthors = async (relationships) => {
  if (relationships.length === 0) {
  return [];
  }

  await bookAuthorsCollection.insertMany(relationships);

  return relationships;
  };

/** ************************************************

* Deletes one book-author relationship.
  ***************************************************/
  const deleteBookAuthor = async (bookId, authorId) => {
  const result = await bookAuthorsCollection.deleteOne({
  bookId,
  authorId
  });

  if (result.deletedCount === 0) {
  return null;
  }

  return true;
  };

/** ************************************************

* Deletes all relationships associated with a book.
  ***************************************************/
  const deleteBookAuthorsByBookId = async (bookId) => {
  const result = await bookAuthorsCollection.deleteMany({
  bookId
  });

  return result.deletedCount;
  };

/** ************************************************

* Deletes all relationships associated with an author.
  ***************************************************/
  const deleteBookAuthorsByAuthorId = async (authorId) => {
  const result = await bookAuthorsCollection.deleteMany({
  authorId
  });

  return result.deletedCount;
  };

export {
    authorsExist,
    getAllBookAuthors,
    getAuthorsByBookId,
    getBooksByAuthorId,
    getBookAuthor,
    createBookAuthor,
    createBookAuthors,
    deleteBookAuthor,
    deleteBookAuthorsByBookId,
    deleteBookAuthorsByAuthorId
};
