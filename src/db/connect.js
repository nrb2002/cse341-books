<<<<<<< HEAD
import 'dotenv/config';
import { MongoClient } from 'mongodb';
=======
import "dotenv/config";
import { MongoClient } from "mongodb";
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
<<<<<<< HEAD
    'MONGODB_URI is not defined. Please set the MONGODB_URI environment variable.'
=======
    "MONGODB_URI is not defined. Please set the MONGODB_URI environment variable.",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
  );
}

const client = new MongoClient(uri);

const dbName = client.db(process.env.DB_NAME);

<<<<<<< HEAD
export const booksCollection = dbName.collection('books');
export const authorsCollection = dbName.collection('authors');
export const bookAuthorsCollection = dbName.collection('bookAuthors');
=======
export const booksCollection = dbName.collection("books");
export const authorsCollection = dbName.collection("authors");
export const bookAuthorsCollection = dbName.collection("bookAuthors");
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
