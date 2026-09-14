/** ************************************************
 * src/models/authors.js
 * This file contains the database business logic only - the functions for interacting with the authors collection in the database.
 ***************************************************/

import { authorsCollection, bookAuthorsCollection } from "../db/connect.js";

/** ************************************************
 * Retrieves all authors.
 ***************************************************/
const getAllAuthors = async () => {
  const authors = await authorsCollection.find({}).toArray();

  return authors;
};

/** ************************************************
 * Retrieves an author by their ID.
 ***************************************************/
const getAuthorById = async (authorId) => {
  const author = await authorsCollection.findOne({ id: authorId });

  return author;
};

/** ************************************************
 * Creates a new author.
 ***************************************************/
const createAuthor = async (author) => {
  const existingAuthor = await authorsCollection.findOne({
    id: author.id,
  });

  if (existingAuthor) {
    return null;
  }

  await authorsCollection.insertOne({
    id: author.id,
    name: author.name,
    birthDate: author.birthDate,
    nationality: author.nationality,
  });

  return author;
};

/** ************************************************
 * Updates an existing author.
 ***************************************************/
const updateAuthor = async (authorId, author) => {
  const result = await authorsCollection.updateOne(
    { id: authorId },
    {
      $set: {
        name: author.name,
        birthDate: author.birthDate,
        nationality: author.nationality,
      },
    },
  );

  if (result.matchedCount === 0) {
    return null;
  }

  return getAuthorById(authorId);
};

/** ************************************************
 * Deletes an author by their ID.
 ***************************************************/
const deleteAuthor = async (authorId) => {
  const relationship = await bookAuthorsCollection.findOne({
    authorId,
  });

  if (relationship) {
    return "associated";
  }

  const result = await authorsCollection.deleteOne({
    id: authorId,
  });

  if (result.deletedCount === 0) {
    return null;
  }

  return "deleted";
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
