var express = require("express");
var path = require("path");
var router = express.Router();
module.exports = router;
var dbContrtoller = require('../DBcontroller/db.controller.js');

router.route("/")
	.post(function(request,res) {
 	dbContrtoller.saveDataFromRos(request.body, function() {
 		res.status(200).send(request.body);
 	});
});


router.route("/getDetectedUsers")
	.get(function(request,res) {
		var date = "01/19/2016";
 	dbContrtoller.getDataFromRos('detected_users', date, function(data) {
 		console.log(data);
 		res.status(200).send(data);
 	});
});
