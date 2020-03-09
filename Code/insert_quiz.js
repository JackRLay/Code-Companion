var mongoose = require("mongoose");
var schemas = require("./schemas");
var MongoClient = require("mongodb").MongoClient;

var uri = "mongodb+srv://new-user_1:wordPass@codecompanion-yszx1.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useMongoClient: true});


// Set up a DB connection event handler.
MongoClient.connect(uri, { useNewUrlParser: true },
  function(err, db) {
  // Connect to the right DB and create an object.
  var dbo = db.db("quizdb");
  var question1 = new schemas.ttQuestion( {
    "name": "ModulusTT",
      "question" : "What is the symbol for the modulus operator?",
      "ans1" : "%",
      "ans2" : "&",
      "ans3" : "@",
      "answer" : "A"
  });

  var question2 = new schemas.ttQuestion( {
    "name": "ModulusTT",
      "question" : "What does the modulus operator do?",
      "ans1" : "Divides two numbers and returns the result",
      "ans2" : "Returns the remainder of two numbers when divided",
      "ans3" : "Returns the result and remainder of a division",
      "answer" : "B"
  });
  
  var question3 = new schemas.ttQuestion( {
    "name": "ModulusTT",
      "question" : "What is the answer to the following?   22%5",
      "ans1" : "5",
      "ans2" : "4",
      "ans3" : "2",
      "answer" : "C"
  });
  

    var quiz = new schemas.ttQuiz(
      {
        question1,
         question2,
         question3
      }
    );
  
  dbo.collection("ModulusTT").insertOne(quiz, function(err, res){
    console.log("Added quiz");
    db.close
  });
  quiz.save();

  });


console.log("Saved");

