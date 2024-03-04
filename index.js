import express from 'express';
import { config } from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';
import bodyParser from 'body-parser';

// Load environment variables
config();

// Create a web server
const app = express();
const port = process.env.PORT || 3034;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Initialize OpenAI API

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

// Define a route to handle questions
app.post('/ask', async (req, res) => {
  //console.log("aló",req.body)
  const userMessage = req.body.message;

  // Call the OpenAI API to generate an answer
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": userMessage}],
  });
  res.send(chatCompletion.choices[0].message);
});