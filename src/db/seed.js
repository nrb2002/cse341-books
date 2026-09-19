<<<<<<< HEAD
import { booksCollection } from './connect.js';

const books = [
  {
    id: 'b1',
    author: 'George Orwell',
    title: '1984',
    publicationDate: '1949-06-08',
  },
  {
    id: 'b2',
    author: 'Jane Austen',
    title: 'Pride and Prejudice',
    publicationDate: '1813-01-28',
  },
  {
    id: 'b3',
    author: 'J.R.R. Tolkien',
    title: 'The Hobbit',
    publicationDate: '1937-09-21',
=======
import { booksCollection } from "./connect.js";

const books = [
  {
    id: "b1",
    author: "George Orwell",
    title: "1984",
    publicationDate: "1949-06-08",
  },
  {
    id: "b2",
    author: "Jane Austen",
    title: "Pride and Prejudice",
    publicationDate: "1813-01-28",
  },
  {
    id: "b3",
    author: "J.R.R. Tolkien",
    title: "The Hobbit",
    publicationDate: "1937-09-21",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
  },
];

const seedBooks = async () => {
  try {
    await booksCollection.deleteMany({});
    await booksCollection.insertMany(books);

    console.log("Books seeded successfully.");
  } catch (error) {
    console.error("Error seeding books:", error);
  }
};

seedBooks();
