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

router.route("/saveDashboard")
	.post(function(request,res) {
	 	console.log(request.body);
        dbContrtoller.saveDashboard(request.body, function() {
        	res.status(200).send(request.body);
        });
	});

router.route("/getDashboard")
	.get(function(request,res) {
		console.log(request.query);
		dbContrtoller.find(request.query.email, 'dashboards', function(userDashboard) {
	        if (userDashboard.length<0) {
	            res.status(500).send("no dashboard to load");
	        }
	        else {
	            res.status(200).send(userDashboard[0]);
	            console.log(userDashboard[0]);
	        }
	    });		
	});