"use strict";
// const express = require("express");
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import serverless from "serverless-http";
import connectDB from "../../mongodb/connect.js";
import dalleRoutes from "../../routes/dalleRoutes.js";
import postRoutes from "../../routes/postRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/post", postRoutes);

app.get("/", (req, res) => {
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
