import React, { useState, useEffect } from "react";

import Header from "./Header";
import ConversationArea from "./ConversationArea";
import InputArea from "./InputArea";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

function Chatbot() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    document.title = "AI Counselor";
  }, []);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const userMessage = message;
      setConversation((prev) => [...prev, { role: "user", content: userMessage }]);
      setMessage("");

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Map conversation history to Gemini format, skipping elements that failed
        const history = conversation
          .filter(msg => msg.role === "user" || msg.role === "assistant")
          .map(msg => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
          }));

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(userMessage);
        const responseText = result.response.text();

        setConversation((prev) => [...prev, { role: "assistant", content: responseText }]);
      } catch (error) {
        console.error("Error getting AI response:", error);
        setConversation((prev) => [...prev, { role: "error", content: "Sorry, I had trouble connecting to the AI Counselor right now." }]);
      }
    }
  };

  return (
    <>
      <Box
        height={isSmallScreen ? window.innerHeight - 58 : window.innerHeight - 64} // 100svh - 58px --
        display="flex"
        flexDirection="column"
        overflow="hidden"
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <Header />
        <ConversationArea conversation={conversation} />
        <InputArea message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </Box>
    </>
  );
}

export default Chatbot;
