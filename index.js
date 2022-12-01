// Server setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const path = require("path");

// Controllers
const userController = require('./views/script');

// routes
app.use('/', userController);



// Middleware
app.use(express.static(__dirname + '/views'))



// Start server
app.listen(PORT, console.log(`Server is live on http://localhost:${PORT}`));

app.get("/", (req, res) => {
    res.sendFile("login.html", { root: path.join(__dirname, "views") });
});

   
 