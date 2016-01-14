
// data base 
// to run mongo : mongod --dbpath data/db
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

function DBController() {};

DBController.addUser = function(user){
	console.log("DBController addUser function, user : ");
	console.log(user);

	MongoClient.connect(url, function(err, db) {
  		assert.equal(null, err);
  		console.log("MongoDB (test insertion user) connected correctly to server. with url : " + url);

  		// test insertion user
      	// Get the documents collection
   		var collection = db.collection('users');

    	// Insert some users
    	collection.insert(user, function (err, result) {
      	if (err) {
        	console.log(err);
      	} else {
        	console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      	}
    	//Close connection
    	db.close();

    	});
	});
}

DBController.findUser = function(user, callback){
	console.log("DBController findUser function, user : ");
	console.log(user);


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("MongoDB (test find user) connected correctly to server. with url : " + url);

  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('users');

    // Insert some users
    collection.find({email: user}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
        callback(result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      //Close connection
      db.close();
    });
  }

});
}


module.exports = DBController;