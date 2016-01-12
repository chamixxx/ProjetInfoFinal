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

router.route("/signup")
	.post(function(request,res) {
 	console.log(request.body);
 	 res.status(200).send("ok");
  
});
