var express = require("express");
var path = require("path");
var router = express.Router();
module.exports = router;
var bodyParser = require('body-parser');
var querystring = require('querystring');


router.use( bodyParser.json() );       
router.use(bodyParser.urlencoded({     
  extended: true
})); 


var userMap={};
	userMap['jdoe@a.com']={
            name: 'jdoe',
            email: 'jdoe@a.com',
            password: 'jdoepwd',
            confirm: 'jdoepwd'
        };
	userMap['james@bond.com']={
            name: 'james',
            email: 'james@bond.com',
            password: 'bond',
            confirm: 'bond'
        };
    userMap['z@z']={
        	name: 'z',
        	email: 'z@z',
            password: 'zzzzzzzz',
            confirm: 'zzzzzzzz'
        };


router.route("/signup")
	.post(function(request,res) {
 	console.log(request.body);
 	console.log("userMap : ");
 	console.log(userMap);
 	if (!(request.body.email in userMap)) {
    	userMap[request.body.email] = request.body;
    	console.log("user added");
    	console.log("userMap 2 : ");
    	console.log(userMap);
    	console.log(userMap[request.body.email]);
    	res.status(200).send(userMap[request.body.email]);
    	console.log("user added 2");
    }
    else {
    	console.log("error, email already exist.");
    	res.status(500).send("error, email already exist.");
    }
});

router.route("/login")
	.get(function(request,res) {
	console.log("login");
 	console.log(request.query);
 	if (request.query.email in userMap) {
 		if (request.query.password == userMap[request.query.email].password) {
 			console.log("user login ok");
    		res.status(200).send(userMap[request.query.email]);
    	}
    	else {
    		res.status(500).send("Wrong password.");
    	}
    }
    else {
    	console.log("error, email does not exist.");
    	res.status(500).send("error, email does not exist.");
    }
  
});


router.route("/profile")
	.get(function(request,res) {
	console.log("profile");
 	console.log(request.query.email);
 	if (request.query.email in userMap) {
 		console.log("user profile ok");
    	res.status(200).send(userMap[request.query.email]);
    }
    else {
    	console.log("error, user profile does not exist.");
    	res.status(500).send("error, user profile does not exist.");
    }
});

router.route("/profileupdateprofile")
	.post(function(request,res) {
	console.log("updatesettings request : ");
 	console.log(request.body);
 	console.log("userMap : ");
 	console.log(userMap);
 	if ((request.body.oldemail in userMap)) {
 		if (request.body.oldemail != request.body.email) {
 			var userTmp = {
            	name: request.body.name,
            	email: request.body.email,
            	password: userMap[request.body.oldemail].password,
            	confirm: userMap[request.body.oldemail].password
        	};

        	delete userMap[request.body.oldemail];  
        	userMap[request.body.email] = userTmp;
        	console.log("new usermap : ");
        	console.log(userMap);
        	res.status(200).send(userMap[request.body.email]);
    		console.log("user updated");
 		}
    	else {
    		res.status(500).send("error, updating profile.");
    	}
    }
    else {
    	console.log("error, email profile does not exist.");
    	res.status(500).send("error, email profile does not exist.");
    }
});

