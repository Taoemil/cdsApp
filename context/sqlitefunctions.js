const sqlite3 = require('sqlite3').verbose();

// DB START CONNECTION
const db = new sqlite3.Database('./db.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    // Opens the database for reading and writing (accesing and adding)
      if (err){
        return console.error(err.message);
      } else {
        console.log('Connected to db.sqlite');
      }
  });
  
  /* drop table 
  db.serialize(function() {
    db.run('drop table users')
  })
  */
  
  // CREATE USER TABLE
  db.serialize(function() {
      db.run('create table if not exists users (userId integer primary key, username text, password text)');
    });
    


/*
// CLOSE DB AFTER PENDING QUERIES
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
*/

module.exports = db;