const express = require("express");
const { getAllBooks, getBookById, createBook, updateBookById, updateBookPartiallyById, deleteBookById } = require("../controllers/book.controller");


const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id",getBookById);

router.post("/", createBook);


router.put("/:id", updateBookById);


// router.patch("/:id", updateBookPartiallyById);

router.delete("/:id", deleteBookById);

module.exports = router;