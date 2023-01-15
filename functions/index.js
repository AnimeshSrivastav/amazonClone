/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line quotes
const stripe = require("stripe")('fushkajk');

// API

// API CONFIGURATION
const app = express();
// middleware
app.use(cors({origin: true}));
app.use(express.json());


// API ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/payments/create", async (req, res) => {
  const amount = req.query.total;
  console.log("Payment received for the amount " + amount);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "INR",
  });

  res.status(201).json({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listener
exports.api = functions.https.onRequest(app);
