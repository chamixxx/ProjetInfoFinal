var express = require("express");
var path = require("path");
var router = express.Router();
module.exports = router;

router.route("/")
	.post(function(request,res) {
 	 res.status(200).send(request.body);
});
