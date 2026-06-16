const authorsTable = require("../models/author.model.js");
const db = require("../db/index.js");
const { eq } = require("drizzle-orm");
const booksTable = require("../models/book.model.js");

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await db.select().from(authorsTable);
  
    return res.status(200).json({
        status: "success",
        message: `all authors`,
        authors,
      });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: `Internal server error`,
      
    });
  }
}

exports.getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
  
    const [author] = await db.select().from(authorsTable).where(eq(authorsTable.id, id));
  
    if(!author) {
      return res.status(404).json({
        status: "failure",
        message: `Author with ${id} does not exist`,
        
      });
    }
  
    return res.status(200).json({
        status: "success",
        message: `Author with id ${id} is`,
        author,
      });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: `Internal server error`,
      
    });
  }


}

exports.createAuthor = async (req, res) => {
  try {
    const {firstName, lastName, email} = req.body;
    
    const [result] = await db.insert(authorsTable).values({firstName, lastName, email}).returning({id: authorsTable.id});

    return res.status(201).json({
      status: "success",
      message: `Author created`,
      
    });

  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: `Internal server error`,
      
    });
  }
}

exports.getBookByAuthorId = async (req, res) => {
  try {
    const id = req.params.id;
    const books = await db.select().from(booksTable).where(eq(booksTable.authorId, id));

    return res.status(200).json({
      status: "success",
      message: `All books of Author`,
      books
      
    });

  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: `Internal server error`,
      
    });
  }
}


