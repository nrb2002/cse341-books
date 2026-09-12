import app from './app.js';

import { createIndexes } from './src/db/indexes.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await createIndexes();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing database indexes:', error);
    }
};

startServer();