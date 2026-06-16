const express = require("express");
const { getAllAuthors, getAuthorById, createAuthor, getBookByAuthorId } = require("../controllers/author.controller");


const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);

router.post("/", createAuthor)
router.get("/:id/books", getBookByAuthorId)




module.exports = router;