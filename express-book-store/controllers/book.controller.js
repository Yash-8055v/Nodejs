const booksTable = require("../models/book.model.js");
const authorsTable = require("../models/author.model.js");
const db = require("../db/index.js");
const { eq, ilike, sql } = require("drizzle-orm");
const { table } = require("node:console");
const { title } = require("node:process");



exports.getAllBooks = async (req, res) => {
  try {
    const search = req.query.search;
    if(search) {
      // const books = await db.select().from(booksTable).where(ilike(booksTable.title, `%${search}%`));

      const books = await db.select().from(booksTable).where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);

      return res.status(200).json({
      status: "success",
      message: `all books with search query ${search} are`,
      books,
    });
    }
    const allBooks = await db.select().from(booksTable);
    return res.status(200).json({
      status: "success",
      message: "All books",
      allBooks,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

exports.getBookById = async (req, res) => {
  // const id = parseInt(req.params);

  // // id is string and id in BOOKS is int so to use === const {id} = parseInt(req.params)

  // if(isNaN(id)) {
  //   return res.status(400).json({error: "id must be of type number"})
  // }

  // const book = BOOKS.find(e => e.id == id);
  // if(!book) {
  //   return res.status(404).send("Book not found");
  // }
  // return res.status(200).json(book);

  try {
    const id = req.params.id;

    const [book] = await db
      .select()
      .from(booksTable)
      .where((table) => eq(table.id, id))
      .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
      .limit(1);

    if (!book) {
      return res.status(404).json({
        status: "failure",
        message: "book not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: `book with id: ${id}`,
      book,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, description, authorId } = req.body;

    if (!title || title === "") {
      return res.status(400).json({
        status: "failure",
        message: "book title is required",
      });
    }

    

    // const id = BOOKS.length + 1;

    // const newBook = {id, title, author};
    // BOOKS.push(newBook);


    const [result] = await db.insert(booksTable).values({ title, description, authorId }).returning({id: booksTable.id});

    if(!result) {
      return res.status(404).json({
      status: "failure",
      message: "author not found",
    });
    }

    return res.status(201).json({
      status: "success",
      message: `book with id ${result.id} is inserted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

exports.updateBookById = async (req, res) => {
  // const id = parseInt(req.params.id);
  // const { title, author } = req.body;

  // if (isNaN(id)) {
  //   return res.status(400).json({ error: "id must be a number" });
  // }

  // const idxToUpdate = BOOKS.findIndex((book) => book.id === id);

  // if (idxToUpdate === -1) {
  //   return res.status(404).json({ error: "Book not found" });
  // }

  // BOOKS[idxToUpdate] = { id, title, author };

  // Or
  //     BOOKS = BOOKS.map(book =>
  //     book.id === id ? { id, title, author } : book
  // );

  // return res.status(200).json({
  //   message: "Book updated successfully",
  //   content: BOOKS[idxToUpdate],
  // });

  try {
    const id = req.params.id;
    const {title, description, authorId} = req.body;
  
    const result = await db.update(booksTable).set({title, description, authorId}).where(eq(booksTable.id, id));

    if (!result.rowCount) {
      return res.status(404).json({
      status: "failure",
      message: "Book not found",
      });
    }


    return res.status(200).json({
      status: "success",
      message: "book updated successfully",
      result
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
    });
  }

};

// exports.updateBookPartiallyById = (req, res) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id)) {
//     return res.status(400).json({
//       error: "id must be a number",
//     });
//   }

//   const bookIndex = BOOKS.findIndex((book) => book.id === id);

//   if (bookIndex === -1) {
//     return res.status(404).json({
//       error: "Book not found",
//     });
//   }

//   // Update only the fields sent in the request body
//   BOOKS[bookIndex] = {
//     ...BOOKS[bookIndex],
//     ...req.body,
//   };

//   return res.status(200).json({
//     message: "Book updated successfully",
//     content: BOOKS[bookIndex],
//   });
// };

exports.deleteBookById = async (req, res) => {
  // const id = parseInt(req.params);

  // if (isNaN(id)) {
  //   return res.status(400).json({ error: "id must be of type number" });
  // }

  // const indexToDelete = BOOKS.findIndex((e) => e.id === id);

  // if (indexToDelete < 0) {
  //   return res.status(404).json({ error: "Book not found" });
  // }

  // BOOKS = BOOKS.filter((book) => book.id != id);

  // OR

  // BOOKS.splice(indexToDelete, 1);

  // return res
  //   .status(200)
  //   .json({ message: "Book deleted successfully", content: BOOKS });

  try {
    const id = req.params.id;

    const [result] = await db.delete(booksTable).where(eq(booksTable.id, id)).returning();

    if(!result) {
      return res.status(404).json({
      status: "failure",
      message: "book not found",
    });
    }

    return res.status(200).json({
      status: "success",
      message: "book deleted successfully",
    });
    
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
    });
  }
};
