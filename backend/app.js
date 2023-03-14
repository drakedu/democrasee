// Include packages.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config({'path': '.env'});

// Create Express app.
const app = express();

// Add CORS header.
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

// Configure the OpenAI API.
const configuration = new Configuration({
    organization: process.env.OPENAI_API_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create port for server.
const PORT = process.env.API_PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Define POST request.
app.post("/", async(req, res) => {
    const {input} = req.body;

    const output = await openai.createCompletion({
        "model": "text-davinci-003",
        "prompt": input,
        "temperature": 0.9,
        "max_tokens": 500,
        "top_p": 1,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.6,
        "stop": [" Human:", " AI:"]
    });
    
    res.send(output.data.choices[0].text.trim());
})
