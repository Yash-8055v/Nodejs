const {BOOKS} = require("../models/book.js");


exports.getAllBooks = (req, res) => {
  return res.status(200).json(BOOKS);
}

exports.getBookById =  (req, res) => {
  const id = parseInt(req.params);

  // id is string and id in BOOKS is int so to use === const {id} = parseInt(req.params)

  if(isNaN(id)) {
    return res.status(400).json({error: "id must be of type number"})
  }

  const book = BOOKS.find(e => e.id == id);
  if(!book) {
    return res.status(404).send("Book not found");
  }
  return res.status(200).json(book);
}


exports.createBook = (req, res) => {
  const {title, author} = req.body;
  
  if(!title || title === "")
    return res.status(400).json({error: "title is required"})

  if(!author || author === "")
    return res.status(400).json({error: "author is required"})

  const id = BOOKS.length + 1;

  const newBook = {id, title, author};
  BOOKS.push(newBook);

  return res.status(201).json({message: "Book added successfully",
  content: newBook});
}


exports.updateBookById = (req, res) => {

    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: "id must be a number" });
    }

    const idxToUpdate = BOOKS.findIndex(book => book.id === id);

    if (idxToUpdate === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    BOOKS[idxToUpdate] = { id, title, author };

    // Or
//     BOOKS = BOOKS.map(book =>
//     book.id === id ? { id, title, author } : book
// );

    return res.status(200).json({
        message: "Book updated successfully",
        content: BOOKS[idxToUpdate]
    });

}

exports.updateBookPartiallyById = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "id must be a number"
        });
    }

    const bookIndex = BOOKS.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            error: "Book not found"
        });
    }

    // Update only the fields sent in the request body
    BOOKS[bookIndex] = {
        ...BOOKS[bookIndex],
        ...req.body
    };

    return res.status(200).json({
        message: "Book updated successfully",
        content: BOOKS[bookIndex]
    });
}


exports.deleteBookById = (req, res) => {
  const id = parseInt(req.params);

  if(isNaN(id)) {
    return res.status(400).json({error: "id must be of type number"})
  }

  const indexToDelete = BOOKS.findIndex(e => e.id === id);


  if(indexToDelete < 0) {
    return res.status(404).json({error: "Book not found"})
  }

  // BOOKS = BOOKS.filter((book) => book.id != id);

// OR

BOOKS.splice(indexToDelete, 1)

  return res.status(200).json({message: "Book deleted successfully", content: BOOKS})
  
}