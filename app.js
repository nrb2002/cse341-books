import express from 'express';
import router from './src/routes/router.js';

const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to the Book API!' });
});

export default app;





