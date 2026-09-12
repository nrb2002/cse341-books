import {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} from '../models/authors.js';

const getAuthorsHandler = async (req, res) => {
    try {
        const authors = await getAllAuthors();

        return res.status(200).json(authors);
    } catch (error) {
        throw error;
    }
};

const getAuthorByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const author = await getAuthorById(requestedId);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        return res.status(200).json(author);
    } catch (error) {
        throw error;
    }
};

const createAuthorHandler = async (req, res) => {
    const author = req.body;

    try {
        const createdAuthor = await createAuthor(author);

        if (!createdAuthor) {
            return res.status(400).json({
                message: 'Author ID already exists'
            });
        }

        return res.status(201).json(createdAuthor);
    } catch (error) {
        throw error;
    }
};

const updateAuthorHandler = async (req, res) => {
    const requestedId = req.params.id;
    const author = req.body;

    try {
        const updatedAuthor = await updateAuthor(requestedId, author);

        if (!updatedAuthor) {
            return res.status(404).json({
                message: 'Author not found'
            });
        }

        return res.status(200).json(updatedAuthor);
    } catch (error) {
        throw error;
    }
};

const deleteAuthorHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const result = await deleteAuthor(requestedId);

        if (result === 'associated') {
            return res.status(400).json({
                message: 'Author cannot be deleted because books are associated with this author'
            });
        }

        if (!result) {
            return res.status(404).json({
                message: 'Author not found'
            });
        }

        return res.status(204).send();
    } catch (error) {
        throw error;
    }
};

export {
    getAuthorsHandler,
    getAuthorByIdHandler,
    createAuthorHandler,
    updateAuthorHandler,
    deleteAuthorHandler
};