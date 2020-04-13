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
       "question" : "Which of the following is the correct way to print 'Code Companion' in Python?",
       "ans1" : "print(\"Code Companion!\")",
       "ans2" : "print(Hello World!)",
       "ans3" : "echo(\"Code Companion!\")",
       "answer" : "A"
  });

  var question2 = new schemas.ttQuestion( {
      "question" : "Python programs use what to structure the program?",
      "ans1" : "Curly Brackets { }",
      "ans2" : "Identation    ",
      "ans3" : "Square Brackets [ ]",
      "answer" : "B"
  });
  
  var question3 = new schemas.ttQuestion( {
      "question" : "How do you comment code in Python?",
      "ans1" : "//comment",
      "ans2" : "#comment",
      "ans3" : "\"comment\"",
      "answer" : "B"
  });
  

    var quiz = new schemas.ttQuiz(
      {
        "name": "FirstTT",
        question1,
         question2,
         question3
      }
    );
  
  dbo.collection("FirstTT").insertOne(quiz, function(err, res){
    console.log("Added quiz");
    db.close
  });
  quiz.save();

  });


console.log("Saved");

