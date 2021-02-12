
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.get("/", function(req,res){
    res.send("<h1>MCQ Creator Application");
})


app.listen(3000,function(){
    console.log("Server is running at port 3000");
})