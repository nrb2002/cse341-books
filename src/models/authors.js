/** ************************************************
 * src/models/authors.js
 * This file contains the database business logic only - the functions for interacting with the authors collection in the database.
 ***************************************************/

<<<<<<< HEAD
import { authorsCollection, bookAuthorsCollection } from '../db/connect.js';
=======
import { authorsCollection, bookAuthorsCollection } from "../db/connect.js";
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344

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
<<<<<<< HEAD
    }
  );

  if (result.matchedCount === 0) {
    return null;
  }

=======
    },
  );

  if (result.matchedCount === 0) {
    return null;
  }

>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
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
<<<<<<< HEAD
    return 'associated';
=======
    return "associated";
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
  }

  const result = await authorsCollection.deleteOne({
    id: authorId,
  });

  if (result.deletedCount === 0) {
    return null;
  }

<<<<<<< HEAD
  return 'deleted';
=======
  return "deleted";
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
