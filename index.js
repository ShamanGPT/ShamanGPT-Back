import express from 'express';
import { config } from 'dotenv';
import OpenAI from 'openai';
// Load environment variables
config();

// Create a web server
const app = express();
const port = process.env.PORT || 3034;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Initialize OpenAI API

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

// Define a route to handle questions
app.get('/ask-me', async (req, res) => {
  // Call the OpenAI API to generate an answer
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "Cuanto mide una jirafa calva?"}],
  });
  res.send(chatCompletion.choices[0].message);
});