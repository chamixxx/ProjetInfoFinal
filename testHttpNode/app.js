//Lets require/import the HTTP module
var http = require('http');
var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var path = require("path");

app.use(cors());
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 


//Router Definition
var authRoute = require("./app/routes/auth.route.js");
var dashRoute = require("./app/routes/dash.route.js");


//launch Server
var server = http.createServer(app);
server.listen(1300, function(){
  console.log('web server listening on port 1300');
});


//ROUTES
app.use("/authentication", authRoute);
app.use("/dashboard", dashRoute);
