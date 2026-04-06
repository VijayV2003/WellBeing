import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import app from "../../../utils/firebase";
import { Button, TextField, InputAdornment, Typography, useTheme } from "@mui/material";
import styled from "@emotion/styled";

const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: theme.palette.background.default,
}));

const ChatList = styled.div(({ theme }) => ({
  flexGrow: 1,
  padding: "24px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "4px"
}));

const MessageWrapper = styled.div(({ sent }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: sent ? "flex-end" : "flex-start",
  maxWidth: "75%",
  marginBottom: "12px"
}));

const ChatMessage = styled.div(({ theme, sent, flagged }) => ({
  padding: "12px 18px",
  borderRadius: "18px",
  backgroundColor: flagged 
    ? theme.palette.error.main 
    : (sent ? theme.palette.primary.main : theme.palette.background.paper),
  color: (sent || flagged) ? "#fff" : theme.palette.text.primary,
  boxShadow: sent ? "0 4px 12px rgba(0, 133, 121, 0.15)" : "0 2px 8px rgba(0,0,0,0.03)",
  borderTopRightRadius: sent ? "4px" : "18px",
  borderTopLeftRadius: sent ? "18px" : "4px",
  position: "relative"
}));

const ChatMeta = styled.p(({ theme, sent }) => ({
  fontSize: "11px",
  marginTop: "4px",
  color: theme.palette.text.secondary,
  alignSelf: sent ? "flex-end" : "flex-start",
  fontWeight: 500
}));

const ChatInputContainer = styled.div(({ theme }) => ({
  padding: "16px 24px",
  backgroundColor: theme.palette.background.paper,
  borderTop: "1px solid",
  borderColor: theme.palette.divider,
  display: "flex",
  alignItems: "center",
  gap: "12px"
}));

const Chats = ({ groupId }) => {
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();
  const [chatText, setChatText] = useState("");
  const [chats, setChats] = useState([]);
  const lastMessageRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    const chatsRef = app.firestore().collection("groups").doc(groupId).collection("chats").orderBy("timestamp", "asc");
    const unsubscribe = chatsRef.onSnapshot((snapshot) => {
      const chatsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatsData);
    });
    return unsubscribe;
  }, [groupId]);

  useEffect(() => {
    if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: isMountedRef.current ? "smooth" : "auto" });
        if (!isMountedRef.current) isMountedRef.current = true;
    }
  }, [chats]);

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    if (chatText.trim() === "") return;

    try {
      const chatData = {
        text: chatText.trim(),
        userId: user.uid,
        displayName: user.displayName,
        timestamp: new Date(),
      };
      await app.firestore().collection("groups").doc(groupId).collection("chats").add(chatData);
      setChatText("");
    } catch (error) {
      console.error("Chat submission error:", error);
    }
  };

  return (
    <Container>
      <ChatList>
        {chats.map((chat, index) => {
          const isSent = chat.userId === user.uid;
          return (
            <MessageWrapper key={chat.id} sent={isSent} ref={index === chats.length - 1 ? lastMessageRef : null}>
              {!isSent && (
                <Typography variant="caption" sx={{ ml: 1, mb: 0.5, fontWeight: 700, color: 'primary.main', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                  {chat.displayName}
                </Typography>
              )}
              <ChatMessage theme={theme} sent={isSent} flagged={chat.isFlagged}>
                <Typography variant="body1" sx={{ wordBreak: "break-word", lineHeight: 1.5 }}>
                  {chat.isFlagged ? "Message flagged" : chat.text}
                </Typography>
              </ChatMessage>
              <ChatMeta theme={theme} sent={isSent}>
                {chat.timestamp ? chat.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Sending..."}
              </ChatMeta>
            </MessageWrapper>
          );
        })}
      </ChatList>
      <form onSubmit={handleChatSubmit} style={{ marginTop: 'auto' }}>
        <ChatInputContainer theme={theme}>
          <TextField
            fullWidth
            placeholder="Write to the circle..."
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            variant="outlined"
            size="medium"
            sx={{ 
                "& .MuiOutlinedInput-root": { 
                    borderRadius: "24px",
                    backgroundColor: "rgba(0,0,0,0.02)",
                    "& fieldset": { borderColor: "transparent" },
                    "&:hover fieldset": { borderColor: "rgba(0,133,121,0.2)" },
                    "&.Mui-focused fieldset": { borderColor: "primary.main" }
                }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button 
                    variant="contained" 
                    type="submit" 
                    disabled={!chatText.trim()}
                    sx={{ 
                        borderRadius: "20px", 
                        px: 3,
                        boxShadow: "0 4px 12px rgba(0, 133, 121, 0.2)"
                    }}
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </ChatInputContainer>
      </form>
    </Container>
  );
};

export default Chats;
