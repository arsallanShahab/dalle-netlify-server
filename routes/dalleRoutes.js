import * as dotenv from "dotenv";
import express from "express";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hello From open ai");
});

router.route("/").post(async (req, res) => {
  const { prompt } = req.body;
  try {
    const openAiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });
    const generatedImage = openAiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

export default router;
