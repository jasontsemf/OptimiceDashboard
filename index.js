const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// config variables
const config = require('./config');
const PORT = config.PORT;
const mongoose = require('mongoose');
const moment = require('moment');

const MONGODB_URI = config.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

const peopleDB = require('./models/people');
const ordersDB = require('./models/orders');

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/api/total_count', async (req, res, next) => {
  try {
    const data = await peopleDB.find({});
    console.log(data);
    res.json({ number: data.length});
  } catch (error) {
    res.json({ error: JSON.stringify(error) });
  }
});

app.post('/api/signup', async (req, res, next) => {
  try {
    const data = await peopleDB.find({});
    const newPost = {
      name: String(req.body.name),
      email: String(req.body.email),
      ordinal: String(data.length+1)
    };
    const newData = await peopleDB.create(newPost);
    res.json(newData);
  } catch (error) {
    res.json({
      error: JSON.stringify(error)
    });
    console.log(error);
  }
});

app.post('/api/orders', async (req, res, next) => {
  try {
    const addr = {
      country: "United States",
      street_1: "370 Jay Street",
      street_2: "4th Floor",
      city: "Brooklyn",
      state: "NY",
      zip_code: 11201,
    } ;
    const newPost = {
      model_url: "./assets/3d/mouse.obj",
      color: "Black",
      price: 100,
      shipping_addr: addr,
      status: "Paid",
      shippped_date: moment.utc('2020-03-21')
    };
    const newData = await ordersDB.create(newPost);
    res.json(newData);
  } catch (error) {
    res.json({
      error: JSON.stringify(error)
    });
    console.log(error);
  }
});

app.listen(process.env.port || 3000, () => {
  console.log("Server listening at http://localhost:3000!")
});