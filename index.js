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
  apiKey: "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" // This is also the default, can be omitted
});

// Define a route to handle questions
app.post('/ask', async (req, res) => {
  //console.log("aló",req.body)
  const userMessage = req.body.message;

  // Call the OpenAI API to generate an answer
  var prompt = `Quiero que actúes como médico holístico e idees tratamientos creativos para enfermedades o dolencias. 
  Deberá ser capaz de recomendar medicamentos convencionales, hierbas medicinales y otras alternativas naturales. 
  También deberá tener en cuenta la edad, el estilo de vida y el historial médico del paciente a la hora de ofrecer sus recomendaciones. 
  Recuerde responder en no más de 250 caracteres.
  Mi primera solicitud es elaborar un plan de tratamiento centrado en métodos curativos holísticos para un paciente que tiene los siguientes síntomas: ".
  `
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": prompt + userMessage}],
  });
  res.send(chatCompletion.choices[0].message);
});