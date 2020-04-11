var mongoose = require("mongoose");

// The schemas file holds the models for the question and quiz

// The model for a question
var ttQuestion = mongoose.model("Question", {question: String, ans1: String, ans2: String, ans3: String, answer: String});

// The model for a quiz, consisting of questions
var ttQuiz = mongoose.model("Quiz", {
    name: String,
    question1: ttQuestion.schema, 
    question2: ttQuestion.schema,
    question3: ttQuestion.schema});

module.exports.ttQuestion = ttQuestion;
module.exports.ttQuiz = ttQuiz;