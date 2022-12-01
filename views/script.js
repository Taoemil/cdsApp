const express = require("express");
const router = express.Router();
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
var crypto = require('crypto');
const db  = require('../context/sqlitefunctions');
const { userSchema } = require('../validation/joi');
const cors = require("cors");

// CREATE USER

const addUserToDatabase = (username, password) => {
    db.run(
      'insert into users (username, password) values (?, ?)', 
      [username, password], 
      function(err) {
        if (err) {
          console.error(err);
        }
      }
    );
  }

  // GET USER (CHECK IF THEY EXIST)
  const getUserByUsername = (userName) => {
    return new Promise((resolve, reject) => {  
      db.all( 
        'select * from users where userName=(?)',
        [userName], 
        (err, rows) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          return resolve(rows);
        }
      );
    })
  }
  
  // HASH PASSWORD
  const hashPassword = (password) => {
    const md5sum = crypto.createHash('md5');
    const salt = 'Some salt for the hash';
    return md5sum.update(password + salt).digest('hex');
  }

  // EXPRESS SESSION
  router.use(
    session({
        secret: "Secret-key",
        name: "uniqueSessionID",
        saveUninitialized: false,
    })
);


  // CLIENT CREATE USER
  router.post("/createuser", bodyParser.urlencoded(), async (req, res) => {
   try {
    const user = await getUserByUsername(req.body.username)
    if (user.length > 0) {
      return res.send('Username already exists');
    }
     await userSchema.validateAsync(req.body)
    addUserToDatabase(req.body.username, hashPassword(req.body.password));
    res.redirect('/login.html');
   } catch (err) {
    console.error(err);
    res.status(500).send('Email or password not accepted')
   }})  

   // CLIENT LOG IN
  
router.post("/login", bodyParser.urlencoded(), async (req, res) => {
   const users = await getUserByUsername(req.body.username);
   console.log({users});
   if(users.length === 0) {
     return res.redirect("/createuser.html");
   }
  if (users[0].password === hashPassword(req.body.password)) {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      console.log(req.session.loggedIn);
      res.redirect("/frontpage.html");
  } else {
      // Sender en error 401 (unauthorized) til klienten
      return  res.status(401).send('You need a valid acount to acess.');
  }
});

// Når jeg laver get, post, delete, til bøgerne, sørg for at man kun kan gøre det hvis loggedIn = true; 



module.exports = router;

