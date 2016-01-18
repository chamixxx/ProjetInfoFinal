var express = require("express");
var path = require("path");
var router = express.Router();
module.exports = router;
var bodyParser = require('body-parser');
var querystring = require('querystring');
var dbContrtoller = require('../DBcontroller/db.controller.js');

router.use( bodyParser.json() );       
router.use(bodyParser.urlencoded({     
  extended: true
})); 


router.route("/signup")
	.post(function(request,res) {
 	console.log(request.body);
    dbContrtoller.find(request.body.email, 'users', function(dbUser) {
        if (dbUser.length>0) {
            console.log("error, email already exist.");
            res.status(500).send("error, email already exist.");
        }
        else {
            dbContrtoller.addUser(request.body);
            res.status(200).send(request.body);
            console.log("user added 2");
        }
        });
    });
 

router.route("/login")
	.get(function(request,res) {
	console.log("login");
 	console.log(request.query);

    dbContrtoller.find(request.query.email, 'users', function(dbUser){
        console.log("dbUser[0].email : ");
        console.log(dbUser[0].email);
        console.log(request.query.email);
        if (dbUser[0].email == request.query.email) {
            if (request.query.password == dbUser[0].password) {
                console.log("user login ok");
                res.status(200).send(dbUser[0]);
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
});


router.route("/profile")
	.get(function(request,res) {
	console.log("profile");
 	console.log(request.query.email);

    dbContrtoller.findUser(request.query.email, function(dbUser){
        if (dbUser[0].email == request.query.email) {
            console.log("user profile ok");
            res.status(200).send(dbUser[0]);
        }
        else {
            console.log("error, user profile does not exist.");
            res.status(500).send("error, user profile does not exist.");
        }
    });
});


// To do: do it with mongoDB !!
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

