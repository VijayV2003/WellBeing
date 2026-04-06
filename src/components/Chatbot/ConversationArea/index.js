import { Box, Typography, Avatar, Fade } from "@mui/material";
import { styled } from "@mui/system";
import { useRef, useEffect } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const MessageContainer = styled(Box)(({ theme, isUser }) => ({
  display: "flex",
  flexDirection: isUser ? "row-reverse" : "row",
  alignItems: "flex-end",
  marginBottom: theme.spacing(3),
  gap: "12px"
}));

const MessageBubble = styled(Box)(({ theme, isUser, isError }) => ({
  maxWidth: "75%",
  padding: "16px 20px",
  borderRadius: "24px",
  borderBottomLeftRadius: isUser ? "24px" : "4px",
  borderBottomRightRadius: isUser ? "4px" : "24px",
  backgroundColor: isError ? "#fff1f0" : isUser ? theme.palette.primary.main : "#f1f1f1",
  color: isError ? "#f5222d" : isUser ? "#fff" : theme.palette.text.primary,
  boxShadow: isUser ? "0 4px 12px rgba(0, 133, 121, 0.2)" : "0 2px 8px rgba(0,0,0,0.03)",
  border: isError ? "1px solid #ffa39e" : "1px solid transparent",
  position: "relative",
  overflow: "hidden"
}));

const ConversationArea = ({ conversation }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const initialBotMessages = [
    {
      content: "👋 Welcome to the WellBeing Companion! I am your AI Counselor.",
      role: "assistant",
    },
    {
      content: "I provide an empathetic space to explore your concerns about stress, anxiety, or personal growth. How can I support you today?",
      role: "assistant"
    }
  ];

  const fullConversation = [...initialBotMessages, ...conversation];

  return (
    <Box 
        sx={{ 
            flexGrow: 1, 
            overflowY: "auto", 
            p: { xs: 2, md: 4 }, 
            backgroundColor: "#fcfcfc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
    >
      <Box sx={{ width: "100%", maxWidth: "800px" }}>
        {fullConversation.map((msg, index) => {
          const isUser = msg.role === "user";
          const isError = msg.role === "error";
          
          return (
            <Fade in={true} key={index} timeout={500}>
                <MessageContainer isUser={isUser}>
                    {!isUser && (
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: "16px" }}>
                            <SmartToyIcon sx={{ fontSize: 18 }} />
                        </Avatar>
                    )}
                    <MessageBubble isUser={isUser} isError={isError}>
                        <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.5 }}>
                            {msg.content}
                        </Typography>
                    </MessageBubble>
                </MessageContainer>
            </Fade>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default ConversationArea;
