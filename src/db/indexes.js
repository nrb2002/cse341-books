import { authorsCollection, bookAuthorsCollection } from "./connect.js";

const createIndexes = async () => {
  await authorsCollection.createIndex({ id: 1 }, { unique: true });

  await bookAuthorsCollection.createIndex({ bookId: 1 });

  await bookAuthorsCollection.createIndex({ authorId: 1 });

  await bookAuthorsCollection.createIndex(
    { bookId: 1, authorId: 1 },
    { unique: true },
  );
};

export { createIndexes };
