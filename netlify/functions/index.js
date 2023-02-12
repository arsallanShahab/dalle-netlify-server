"use strict";
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const { v2: cloudinary } = require("cloudinary");
const bodyParser = require("body-parser");
const route = require("../../routes/route.js");
const dotenv = require("dotenv");
const postRoutes = require("../../routes/postRoutes.js");
const connectDB = require("../../mongodb/connect.js");
const dalleRoutes = require("../../routes/dalleRoutes.js");
dotenv.config();

// import cors from "cors";
// import dotenv from "dotenv";
// import express from "express";
// import serverless from "serverless-http";
// import connectDB from "../../mongodb/connect.js";
// import dalleRoutes from "../../routes/dalleRoutes.js";
// import postRoutes from "../../routes/postRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/.netlify/functions/index/api/v1/dalle", dalleRoutes);
app.use("/.netlify/functions/index/api/v1/post", postRoutes);
// app.use("/.netlify/functions/index", route); // path must route to lambda

app.get("/.netlify/functions/index", (req, res) => {
  res.send("Hello from DALL-E");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    const port = process.env.PORT || 7171;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

module.exports.handler = serverless(app);
