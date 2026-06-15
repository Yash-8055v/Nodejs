const {drizzle} = require("drizzle-orm/node-postgres");

// db url patter
// postgres://<username>:<password>@<host>:<port>/<db_name>

const db = drizzle(process.env.DB_URI);


module.exports = db;