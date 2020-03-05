var mongoose = require("mongoose");

//Model for time trial question
var ttQuestion= mongoose.model("ttQuestion",{question:String,choiceA:String,choiceB:String,choiceC:String,correct:String})
//Model for whole time trial quiz
var ttQuiz= mongoose.model("ttQuiz",{question1:ttQuestion.schema,
                                     question2:ttQuestion.schema,
                                     question3:ttQuestion.schema});

module.exports.ttQuestion=ttQuestion;
module.exports.ttQuiz=ttQuiz;



