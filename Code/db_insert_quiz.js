var mongoose = require("mongoose");
var schemas = require("./schemas")
var mongoClient = require ("mongodb").mongoClient;

var uri = "mongodb+srv://dbUser:pbffv36P7mU3nbGY@codecompanion-yszx1.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useMongoClient: true});

mongoClient.connect(uri,{useNewUrlParser:true},
    function(err, db){
        var dbo=db.db("quizdb");
        var question1= new schemas.ttQuestion({
            "question": "What is the symbol for the modulus operator?",
            "choiceA": "%",
            "choiceB": "&",
            "choiceC": "@",
            "correct": "A"
        });
        var question2= new schemas.ttQuestion({
            "question": "What does the modulus operator do?",
            "choiceA": "Divides two numbers and returns the result",
            "choiceB": "Returns the remainder of two numbers when divided",
            "choiceC": "Returns the result and remainder of a division",
            "correct": "B"
        });
        var question3= new schemas.ttQuestion({
            "question": "What is the answer to the following?   22%5",
            "choiceA": "5",
            "choiceB": "4",
            "choiceC": "2",
            "correct": "C"
        });
        var quiz = new schemas.Quiz(
            {
                question1,question2,question3
            }
        );

        dbo.collection("tt_modulus").insertOne(quiz, function(err, res){
            console.log("Added quiz");
            db.close
          });
          quiz.save();

    })

