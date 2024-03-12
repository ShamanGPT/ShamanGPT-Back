import express from 'express';
import { config } from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';
import bodyParser from 'body-parser';
import ServerlessHttp from 'serverless-http';

config();

const app = express();
const port = process.env.PORT || 3034;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const openai = new OpenAI({
  apiKey: "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"
});


app.post('/ask', async (req, res) => {
  //console.log("aló",req.body)
  const userMessage = req.body.message;

  var prompt = `Quiero que actúes como médico holístico e idees tratamientos creativos para enfermedades o dolencias. 
  Deberá ser capaz de recomendar medicamentos convencionales, hierbas medicinales y otras alternativas naturales.
  También deberá tener en cuenta la edad, el estilo de vida y el historial médico del paciente a la hora de ofrecer sus recomendaciones. 
  Recuerde responder en no más de 500 caracteres. Recuerda que, sino se trata sobre una enfermedad o algo que se pueda curar con recetas medicinales caseras
  deberás responder que ese tema no es de tu conocimiento. Sin embargo, si es un saludo o algo similar, deberás devolver el saludo, preguntando en qué enfermedad o dolencia necesita ayuda
  Mi primera solicitud es elaborar un plan de tratamiento centrado en métodos curativos holísticos para un paciente que tiene los siguientes síntomas: ".
  `
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": prompt + userMessage}],
  });
  res.send(chatCompletion.choices[0].message);
});


export const handler = ServerlessHttp(app);
