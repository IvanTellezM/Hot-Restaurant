//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// set up express 
var app = express();
var PORT = process.env.PORT || 7000;

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

var tables = [];
// var waitList=[];


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));

});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"))
});

app.get("/api/reservation", function(req, res) {
    res.json(tables);

})

app.get("/api/clear", function(req, res) {
    tables = [];

})

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/reserve", function(req, res) {
    var newReservation = req.body; //this is the new reservation obj
    console.log(newReservation);
    newReservation.id = newReservation.id.replace(/\s+/g, "").toLowerCase();

    tables.push(newReservation);
    res.json(tables);
})