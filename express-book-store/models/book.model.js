const {pgTable, integer, varchar, text, uuid} = require("drizzle-orm/pg-core");
const authorsTable = require("./author.model.js");

const booksTable = pgTable("books", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({length: 100}).notNull(),
  description: text().notNull(),
  authorId: uuid().references(() => authorsTable.id).notNull()
});

module.exports = booksTable;