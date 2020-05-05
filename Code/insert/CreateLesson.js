var mongoose = require("mongoose");
var schemas = require("../schemas/quiz-schemas");
var MongoClient = require("mongodb").MongoClient;

var uri = "mongodb+srv://new-user_1:wordPass@codecompanion-yszx1.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useMongoClient: true});


// Set up a DB connection event handler.
MongoClient.connect(uri, { useNewUrlParser: true },
  function(err, db) {
  // Connect to the right DB and create an object.
  var dbo = db.db("quizdb"); 

    var learningInfo = new schemas.lpInfo(
      {
        "name": "First",
        "text":"this is LEARNIGN",
        "code":
`# This program adds two numbers

num1 = 1.5
num2 = 6.3

# Add two floats
sum = float(num1) + ________¹(num2)

# Display the sum
________²('The sum of {0} and {1} is {2}'.________³(num1, num2, sum))`
      }
    );
  
  dbo.collection("First").insertOne(learningInfo, function(err, res){
    console.log("Added Lesson");
    db.close
  });
  learningInfo.save();

  });


console.log("Saved");

