var fs = require("fs");
var path = require('path');
var express = require('express');
var app = express();
// View Engine
var ejsEngine = require("ejs-locals");
app.engine('ejs', ejsEngine);
app.set('view engine', 'ejs');

var port = process.env.PORT || 3000;

// load files
var capitalsRaw = null;
var countriesRaw = null;

fs.readFile(
    'data/canada_capitals.json', 
    (err, data) => {
        if (err) throw err;
        capitalsRaw = JSON.parse(data);
});

fs.readFile(
    'data/ten_most_populated_countries.json', 
    (err, data) => {
        if (err) throw err;
        countriesRaw = JSON.parse(data);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/countries', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(countriesRaw);
});

app.get('/api/capitals', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(capitalsRaw);
});

app.get('/capitals', (req, res) => {
    res.render("capitals", {title: "Capitals", capitals: capitalsRaw});
});

app.get('/', (req, res) => {
    res.render("index", {title: "Express Lab"});
});

app.listen(port, function(err, res) {
    if (err) {
        console.log("Server Error!")
    } else {
        console.log("Server started and listening on port: " + port);
    }
});