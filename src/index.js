const SQLite = require("sqlite3");
const path = require("path");

const fileDatabase = path.join(__dirname, "db", "database_.sqlite");

SQLite.verbose();
const db = new SQLite.Database(fileDatabase);

const callback = (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("successfully", result);
  }
};

const createTableCities = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS cities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        area VARCHAR(255) NOT NULL,
        state_id INTEGER NOT NULL,
        FOREIGN KEY (state_id) REFERENCES states (id)
    ); 
  `;

  db.run(sql, callback);
};
const createTableStates = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS states (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        initial VARCHAR(2) NOT NULL,
        region VARCHAR(255) NOT NULL
    );
  `;

  db.run(sql, callback);
};

const createTableNeighborhoods = async () => {
  const sql = `

    CREATE TABLE IF NOT EXISTS neighborhoods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        city_id INTEGER NOT NULL,
        FOREIGN KEY (city_id) REFERENCES cities (id)
    );
  `;
  db.run(sql, callback);
};

const createTableAddresses = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address VARCHAR(255) NOT NULL,
        complement VARCHAR(255) NOT NULL,
        number VARCHAR(45) NOT NULL,
        neighborhood_id INTEGER NOT NULL,
        FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods (id)
    );
  `;
  db.run(sql, callback);
};

async function main() {
  await createTableCities();
  await createTableStates();
  await createTableNeighborhoods();
  await createTableAddresses();

  // adicionar usuarios

  // const sql = `;
  //   INSERT INTO users (name, email) VALUES ('Felipe', 'contato@eufelipe.com');
  //   `;

  // db.run(sql, callback);

  db.close();
}

main();
