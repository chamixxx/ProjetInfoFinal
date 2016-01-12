//Lets require/import the HTTP module
var http = require('http');
var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(cors());


app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 

var userMap={};
	userMap['jdoe']='jdoepwd';
	userMap['psmith']='psmithpwd';
	userMap['tp']='tp';


console.log("tete");


app.post('/signup', function (req, res, next) {
    console.log(req.body);
    if (userMap[req.body.login]==req.body.pwd) {
    	var loginSuccess = {
    		"login":req.body.login,
    		"validAuth":true,
    		"role":"admin"
    	};
    }
    else {
    	var loginSuccess = {
    		"login":req.body.login,
    		"validAuth":false,
    		"role":""
    	};
    }
    res.status(200).send(loginSuccess);
});

app.get('/resources_list', function (req, res) {
    console.log(req.body);
    res.status(200).send(loginSuccess);
});

app.listen(1300, function(){
  console.log('CORS-enabled web server listening on port 1300');
});
