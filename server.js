import 'dotenv/config';
import { MongoClient } from "mongodb";
import app from './app.js';


const PORT = process.env.PORT || 3000;


if (!PORT) {
    try {
        throw new Error('PORT is not defined. Please set the PORT environment variable.');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});