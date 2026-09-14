import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../models/authors.js";

/** ************************************************
 * Validates the birthDate format (YYYY-MM-DD).
 ***************************************************/
 
/**
 * Checks whether a value is a valid YYYY-MM-DD date.
 */
const isValidBirthDate = (birthDate) => {
  if (typeof birthDate !== "string") {
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

/** ************************************************
 * Retrieves all authors.
 ***************************************************/

const getAuthorsHandler = async (req, res) => {
  try {
    const authors = await getAllAuthors();

    return res.status(200).json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/** ************************************************
 * Retrieves an author by ID.
 ***************************************************/
 
const getAuthorByIdHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const author = await getAuthorById(requestedId);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error("Error fetching author:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/** ************************************************
 * Creates a new author.
 ***************************************************/
 
const createAuthorHandler = async (req, res) => {
  const { id, name, birthDate, nationality } = req.body;

  if (
    typeof id !== "string" ||
    typeof name !== "string" ||
    typeof birthDate !== "string" ||
    typeof nationality !== "string" ||
    !id.trim() ||
    !name.trim() ||
    !nationality.trim()
  ) {
    return res.status(400).json({
      message: "Invalid author data",
    });
  }

  if (!isValidBirthDate(birthDate)) {
    return res.status(400).json({
      message: "Invalid birthDate format. Use YYYY-MM-DD",
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
        message: "Author with this ID already exists",
      });
    }

    return res.status(201).json(author);
  } catch (error) {
    console.error("Error creating author:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/** ************************************************
 * Updates an existing author.
 ***************************************************/
 
const updateAuthorHandler = async (req, res) => {
  const requestedId = req.params.id;
  const { name, birthDate, nationality } = req.body;

  if (
    typeof name !== "string" ||
    typeof birthDate !== "string" ||
    typeof nationality !== "string" ||
    !name.trim() ||
    !nationality.trim()
  ) {
    return res.status(400).json({
      message: "Invalid author data",
    });
  }

  if (!isValidBirthDate(birthDate)) {
    return res.status(400).json({
      message: "Invalid birthDate format. Use YYYY-MM-DD",
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
        message: "Author not found",
      });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error("Error updating author:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/** ************************************************
 * Deletes an author.
 ***************************************************/
 
const deleteAuthorHandler = async (req, res) => {
  const requestedId = req.params.id;

  try {
    const result = await deleteAuthor(requestedId);

    if (result === "associated") {
      return res.status(400).json({
        message:
          "Author cannot be deleted because books are associated with this author",
      });
    }

    if (result === null) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting author:", error);

    return res.status(500).json({
      message: "Internal server error",
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
