
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})
app.get("/question_info.html", function(req,res){
    res.sendFile(__dirname + "/question_info.html");
})

app.post("/question_info.html",function(req,res){
    var noOfQuestions = Number(req.body.noOfQuestions);
    var institutionName = req.body.institutionName;
    var totalMarks = Number(req.body.totalMarks);
    var totalTime = Number(req.body.totalTime);
    res.render("question", {noOfQuestions: noOfQuestions});
})

app.post("/question",function(req,res){
    res.render("question-print", {question: req.body.question, 
                                  optionA: req.body.optionA, 
                                  optionB: req.body.optionB, 
                                  optionC: req.body.optionC, 
                                  optionD: req.body.optionD})
})
app.listen(3000,function(){
    console.log("Server is running at port 3000");
})