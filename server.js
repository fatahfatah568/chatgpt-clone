const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        { role: "user", content: message }
      ]
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ reply: "حدث خطأ أثناء الاتصال بـ OpenAI" });
  }
});

app.listen(3000, () => {
  console.log('🚀 الخادم يعمل على http://localhost:3000');
});