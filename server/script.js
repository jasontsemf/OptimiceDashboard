const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

// config variables
const config = require('./config');
const PORT = config.PORT;
const mongoose = require('mongoose');

const MONGODB_URI = config.MONGODB_URI;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

const peopleDB = require('./models/people');

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
app.use(bodyParser.json());
// const publicURL = path.resolve(`${__dirname}/public`);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

function getPeople(){
    const contents = fs.readFileSync(path.join(__dirname, "./db/people.json"));
    const obj = JSON.parse(contents);
    return obj;
}

function addPerson(person){
    const unixTimeCreated = new Date().getTime();
    const people = getPeople();
    const timePerson = Object.assign({"created": unixTimeCreated}, person);
    people.people.push(timePerson);
    fs.writeFileSync(path.join(__dirname, "./db/people.json"), JSON.stringify(people));
    return people;
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/signup", (req, res) => {
    const people = getPeople();
    res.json(people);
});

// app.post("/signup", (req, res) => {
//     const person = req.body;
//     const people = addPerson(person);
//     res.json(people);
// })

/**
 * POST
 */
app.post('/singup', async (req, res, next) => {
    try {
      const newPost = {
        name: String(req.body.name),
        email: String(req.body.email),
      };
      const newData = await treeDB.create(newPost);
      res.json(newData);
    } catch (error) {
      res.json({ error: JSON.stringify(error) });
    }
  });

app.listen(3000, () => {
    console.log("Server listening at http://localhost:3000!")
});