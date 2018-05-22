const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env["PORT"] || 8000;
const students = ["isabel", "lee", "nicci"];
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "static")));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("index", {name:"Devin"});
});

app.post("/process", function(req, res){
    students.push(req.body.first_name);
    res.redirect("/students");
});
app.get("/students", function(req, res){
    res.render("students", {"all_students":students});
});

app.listen(port, function(){
    console.log("I am listening at port 8000");
});