const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helpers = require('./helpers');
const l = helpers.l;

// server
const app = express();
const PORT = 3003;

app.listen(PORT, () => {
  l(`app is listening to PORT ${PORT}`)
});

// connect to db
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: "true",
});

mongoose.connection.on("error", err => {
  l("err", err)
});

mongoose.connection.on("connected", (err, res) => {
  l("mongoose is connected")
});


// schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    utility: {
        type: [String],
        enum: ['Monitoring or Inspection', 'Security', 'Delivery', 'Photography', 'Recreation']
    },
    weight: {
        type: String,
        lowercase: true
    }
});

// create a drone w/ productSchema
const Drone = mongoose.model('Drone', productSchema);

const drone = new Drone({
    name: "SV - Aira 157B",
    price: 2455,
    utility: ["Photography"],
    weight: "467 grams",
});

// save it to db
drone.save(function (err, doc) {
    l(doc._id);
});
