
const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var pdf = require('html-pdf'); 

let options = { 
                format: 'A4',
                border: {
                    "top": "0.5in",            // default is 0, units: mm, cm, in, px
                    "right": "1.5in",
                    "bottom": "1.5in",
                    "left": "1.5in"
                  },
                
            };

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

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
    res.render("question", {noOfQuestions: noOfQuestions, institutionName: req.body.institutionName,
                            totalMarks: req.body.totalMarks,
                            totalTime:req.body.totalTime});
})
app.post('/question',(req,res)=>{
    res.render('question-print',{
                                noOfQuestions: Number(req.body.noOfQuestions),
                                institutionName: req.body.institutionName,
                                totalMarks: req.body.totalMarks,
                                totalTime:req.body.totalTime,
                                question: req.body.question, 
                                optionA: req.body.optionA, 
                                optionB: req.body.optionB, 
                                optionC: req.body.optionC, 
                                optionD: req.body.optionD},function(err,html){
        pdf.create(html, options).toFile('./public/uploads/question.pdf', function(err, result) {
            if (err){
                return console.log(err);
            }
             else{
            var datafile = fs.readFileSync('./public/uploads/question.pdf');
            res.header('content-type','application/pdf');
            res.send(datafile);
             }
          });
    })
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running at port 3000");
})