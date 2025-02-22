import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const config = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(config);

router.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error('Error generating image:', error.stack);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
