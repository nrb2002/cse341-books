import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
<<<<<<< HEAD
} from '../models/authors.js';
=======
} from "../models/authors.js";
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344

/**
 * Checks whether a value is a valid YYYY-MM-DD date.
 */
const isValidBirthDate = (birthDate) => {
<<<<<<< HEAD
  if (typeof birthDate !== 'string') {
=======
  if (typeof birthDate !== "string") {
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    return false;
  }

  const date = new Date(`${birthDate}T00:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) && date.toISOString().startsWith(birthDate)
  );
};

/**
 * Retrieves all authors.
 */
const getAuthorsHandler = async (req, res) => {
  try {
    const authors = await getAllAuthors();

    return res.status(200).json(authors);
  } catch (error) {
<<<<<<< HEAD
    console.error('Error fetching authors:', error);

    return res.status(500).json({
      message: 'Internal server error',
=======
    console.error("Error fetching authors:", error);

    return res.status(500).json({
      message: "Internal server error",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    });
  }
};

/**
 * Retrieves an author by ID.
 */
const getAuthorByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const author = await getAuthorById(requestedId);

    if (!author) {
      return res.status(404).json({
<<<<<<< HEAD
        message: 'Author not found',
=======
        message: "Author not found",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
      });
    }

    return res.status(200).json(author);
  } catch (error) {
<<<<<<< HEAD
    console.error('Error fetching author:', error);

    return res.status(500).json({
      message: 'Internal server error',
=======
    console.error("Error fetching author:", error);

    return res.status(500).json({
      message: "Internal server error",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    });
  }
};

/**
 * Creates a new author.
 */
const createAuthorHandler = async (req, res) => {
  const { id, name, birthDate, nationality } = req.body;

  if (
<<<<<<< HEAD
    typeof id !== 'string' ||
    typeof name !== 'string' ||
    typeof birthDate !== 'string' ||
    typeof nationality !== 'string' ||
=======
    typeof id !== "string" ||
    typeof name !== "string" ||
    typeof birthDate !== "string" ||
    typeof nationality !== "string" ||
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    !id.trim() ||
    !name.trim() ||
    !nationality.trim()
  ) {
    return res.status(400).json({
<<<<<<< HEAD
      message: 'Invalid author data',
=======
      message: "Invalid author data",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    });
  }

  if (!isValidBirthDate(birthDate)) {
    return res.status(400).json({
<<<<<<< HEAD
      message: 'Invalid birthDate format. Use YYYY-MM-DD',
=======
      message: "Invalid birthDate format. Use YYYY-MM-DD",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    });
  }

  try {
    const author = await createAuthor({
      id,
      name,
      birthDate,
      nationality,
    });

    if (!author) {
      return res.status(400).json({
<<<<<<< HEAD
        message: 'Author with this ID already exists',
=======
        message: "Author with this ID already exists",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
      });
    }

    return res.status(201).json(author);
  } catch (error) {
<<<<<<< HEAD
    console.error('Error creating author:', error);

    return res.status(500).json({
      message: 'Internal server error',
=======
    console.error("Error creating author:", error);

    return res.status(500).json({
      message: "Internal server error",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    });
  }
};

/**
 * Updates an existing author.
 */
const updateAuthorHandler = async (req, res) => {
  const requestedId = req.params.id;
  const { name, birthDate, nationality } = req.body;

  if (
<<<<<<< HEAD
    typeof name !== 'string' ||
    typeof birthDate !== 'string' ||
    typeof nationality !== 'string' ||
=======
    typeof name !== "string" ||
    typeof birthDate !== "string" ||
    typeof nationality !== "string" ||
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    !name.trim() ||
    !nationality.trim()
  ) {
    return res.status(400).json({
<<<<<<< HEAD
      message: 'Invalid author data',
=======
      message: "Invalid author data",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    });
  }

  if (!isValidBirthDate(birthDate)) {
    return res.status(400).json({
<<<<<<< HEAD
      message: 'Invalid birthDate format. Use YYYY-MM-DD',
=======
      message: "Invalid birthDate format. Use YYYY-MM-DD",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    });
  }

  try {
    const author = await updateAuthor(requestedId, {
      name,
      birthDate,
      nationality,
    });

    if (!author) {
      return res.status(404).json({
<<<<<<< HEAD
        message: 'Author not found',
=======
        message: "Author not found",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
      });
    }

    return res.status(200).json(author);
  } catch (error) {
<<<<<<< HEAD
    console.error('Error updating author:', error);

    return res.status(500).json({
      message: 'Internal server error',
=======
    console.error("Error updating author:", error);

    return res.status(500).json({
      message: "Internal server error",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    });
  }
};

/**
 * Deletes an author.
 */
const deleteAuthorHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const result = await deleteAuthor(requestedId);

<<<<<<< HEAD
    if (result === 'associated') {
      return res.status(400).json({
        message:
          'Author cannot be deleted because books are associated with this author',
=======
    if (result === "associated") {
      return res.status(400).json({
        message:
          "Author cannot be deleted because books are associated with this author",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
      });
    }

    if (result === null) {
      return res.status(404).json({
<<<<<<< HEAD
        message: 'Author not found',
=======
        message: "Author not found",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
      });
    }

    return res.status(204).send();
  } catch (error) {
<<<<<<< HEAD
    console.error('Error deleting author:', error);

    return res.status(500).json({
      message: 'Internal server error',
=======
    console.error("Error deleting author:", error);

    return res.status(500).json({
      message: "Internal server error",
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
    });
  }
};

export {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
};
