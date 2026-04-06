const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage("Hi");
    console.log("Response text:", result.response.text());
  } catch (err) {
    console.error("Gemini Error:", err);
  }
}

run();
