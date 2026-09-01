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
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Error starting the server:', error);
    }
});


