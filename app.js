
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

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
    console.log(noOfQuestions);
    console.log(institutionName);
    console.log(totalMarks);
    console.log(totalTime);
})

app.listen(3000,function(){
    console.log("Server is running at port 3000");
})