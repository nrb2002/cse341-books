import 'dotenv/config';
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MONGODB_URI is not defined. Please set the MONGODB_URI environment variable.');
}

const client = new MongoClient(uri);
const dbName = client.db(process.env.DB_NAME);

export const booksCollection = dbName.collection('books');