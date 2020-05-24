var mongoose = require("mongoose");
var schemas = require("../schemas/schemas");
var MongoClient = require("mongodb").MongoClient;

var uri = "mongodb+srv://new-user_1:wordPass@codecompanion-yszx1.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useMongoClient: true});


// Set up a DB connection event handler.
MongoClient.connect(uri, { useNewUrlParser: true },
  function(err, db) {
  // Connect to the right DB and create an object.
  var dbo = db.db("Topics"); 
  //lesson
    var  learningInfo= new schemas.lpInfo({
        text: 
`
The for loop repeats a section of code for a given sequence.
In the top example, the list is 'iterated' and all items are printed.

The while loop repeats a section of code as long as a condition is met.
The second example keeps adding 1 until the variable count is 5.
`,

        code:
`
#For loop
numbers = [1,3,4,5,6]
for number in numbers:
        print(number)

#While loop
count= 0
while count <6:
        print(count)
        count= count+1 #adds one every time it is looped

`
        ,

    });
    //activity
    var activity= new schemas.blanks({
        code:
`
#create a for loop that prints the list myList
myList= ["Dave", "John", "Mike"]

for name in _______¹:
        print(_______²)

#create a while loop that adds 2 until counter is 10
counter=0
_______³ counter<11:
        count=count+2

`,
        correct1:"myList",
        correct2:"name",
        correct3:"while" 

    })
    //quiz
    var question1 = new schemas.ttQuestion( {
        "question" : "What does a for loop do?",
        "ans1" : "Adds a number every time it is called",
        "ans2" : "Iterates over a sequence",
        "ans3" : "Prints numbers when called",
        "answer" : "B"
   });

    var question2 = new schemas.ttQuestion( {
        "question" : "How do you make a while loop?",
        "ans1" : "Using the while keyword",
        "ans2" : "Commas ,",
        "ans3" : "Create a list",
        "answer" : "A"
    });

    var question3 = new schemas.ttQuestion( {
        "question" : "What does a while loop do?",
        "ans1" : "Repeats until a condition is met",
        "ans2" : "Repeats while a condition is met",
        "ans3" : "Repeats forever",
        "answer" : "B"
    });

    var quiz = new schemas.ttQuiz(
        {
            question1,
            question2,
            question3
        }
      );

      var topic = new schemas.topic({
          "name" :"Loops",
          learningInfo,
          activity,
          quiz
      })
      dbo.collection("Loops").insertOne(topic, function(err, res){
        console.log("Added Topic");
        db.close
      });
      topic.save();
    
      });
    
    
    console.log("Saved");
 

  