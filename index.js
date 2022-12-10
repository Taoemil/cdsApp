// Server setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const path = require("path");
const https = require("https");
const fs = require("fs");


// Controllers
const userController = require('./views/script');

// routes
app.use('/', userController);


// Middleware
app.use(express.static(__dirname + '/views'))
app.use(express.json());
 

// Start server

// HTTPS kommenteres ud igen, da det ikke fungere godt i browser med selv-generede nøgler og certifikater
/*
const server = https.createServer({

    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    requestCert: true,
    rejectUnauthorized: false 

},
app
)
 */

app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
}) 




app.get("/", (req, res) => {
    res.sendFile("login.html", { root: path.join(__dirname, "views") });
});



   
 