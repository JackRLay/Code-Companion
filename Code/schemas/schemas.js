var mongoose = require("mongoose");

// The model for a question
var ttQuestion = mongoose.model("Question", {question: String, ans1: String, ans2: String, ans3: String, answer: String});

// The model for a quiz, consisting of questions
var ttQuiz = mongoose.model("Quiz", {
    question1: ttQuestion.schema, 
    question2: ttQuestion.schema,
    question3: ttQuestion.schema});

//model for a learning page
var lpInfo = mongoose.model("lpInfo",{
    text: String,
    code: String
})

//model for a guess the blanks page
var blanks = mongoose.model("Blanks",{
    code: String,
    correct1: String,
    correct2: String,
    correct3: String
})

var topic= mongoose.model("Topic",{
    name: String,
    learningInfo: lpInfo.schema,
    activity: blanks.schema,
    quiz: ttQuiz.schema
})


module.exports.ttQuestion = ttQuestion;
module.exports.ttQuiz = ttQuiz;
module.exports.lpInfo = lpInfo;
module.exports.blanks = blanks;
module.exports.topic = topic;

