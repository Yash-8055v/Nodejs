require("dotenv/config");
const express = require("express");
const bookRouter = require("./routes/book.routes.js");
const authorRouter = require("./routes/author.routes.js")
const {loggerMiddleware} = require("./middlewares/logger.js");

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(loggerMiddleware);




// Routes
app.use("/books", bookRouter);
app.use("/authors", authorRouter);


app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`);
})



