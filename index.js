import { Configuration, OpenAIApi } from "openai";
import readline from "readline";
import * as dotenv from 'dotenv'
dotenv.config()

// CREATING OPENAI CONFIGURATION USING THE API KEY
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API,
});

// CREATE AN OPENAI INSTANCE USING THE CONFIGURATION ABOVE 
const openai = new OpenAIApi(configuration);

// CONFIGURATION FOR I/O SETUP IN THE TERMINAL
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// GETTING THE USER PROMPT
userInterface.prompt();

// I/O SETUP BETWEEN USER AND CHATBOT
userInterface.on("line", async (input) => {
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    })
    .then((res) => {
      console.log(res.data.choices[0].message.content);
      userInterface.prompt();
    })
    .catch((e) => {
      console.log(e);
    });
});
