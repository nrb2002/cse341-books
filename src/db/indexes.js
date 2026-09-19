<<<<<<< HEAD
import { authorsCollection, bookAuthorsCollection } from './connect.js';
=======
import { authorsCollection, bookAuthorsCollection } from "./connect.js";
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344

const createIndexes = async () => {
  await authorsCollection.createIndex({ id: 1 }, { unique: true });

  await bookAuthorsCollection.createIndex({ bookId: 1 });

  await bookAuthorsCollection.createIndex({ authorId: 1 });

  await bookAuthorsCollection.createIndex(
    { bookId: 1, authorId: 1 },
<<<<<<< HEAD
    { unique: true }
=======
    { unique: true },
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
  );
};

export { createIndexes };
