import React, { Fragment, useEffect, useRef } from "react";
import { Box, List, Typography } from "@mui/material";
import { styled } from "@mui/system";

const MessageBubble = styled(Box)(({ theme, iscurrentuser }) => ({
  display: "inline-flex",
  flexDirection: "column",
  padding: "12px 18px",
  borderRadius: "20px",
  marginBottom: theme.spacing(1),
  alignSelf: iscurrentuser ? "flex-end" : "flex-start",
  backgroundColor: iscurrentuser ? theme.palette.primary.main : theme.palette.background.paper,
  color: iscurrentuser ? "#fff" : theme.palette.text.primary,
  boxShadow: iscurrentuser ? "0 4px 12px rgba(0, 133, 121, 0.2)" : "0 2px 8px rgba(0,0,0,0.03)",
  borderBottomRightRadius: iscurrentuser ? "4px" : "20px",
  borderBottomLeftRadius: iscurrentuser ? "20px" : "4px",
  position: "relative",
  maxWidth: "80%",
  margin: theme.spacing(0.5, 2),
}));

const TimestampTypography = styled(Typography)(({ theme, iscurrentuser }) => ({
  fontSize: "0.65rem",
  color: iscurrentuser ? "rgba(255,255,255,0.7)" : theme.palette.text.secondary,
  textAlign: "right",
  marginTop: "4px",
  fontWeight: 600
}));

const DateSeparator = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4, 0, 2, 0),
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 1
}));

const MessageList = ({ messages, currentUserUid }) => {
  const lastMessageRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: isMountedRef.current ? "smooth" : "auto" });
        if (!isMountedRef.current) isMountedRef.current = true;
    }
  }, [messages]);

  const isNewDay = (prevTimestamp, currentTimestamp) => {
    const prevDate = new Date(prevTimestamp);
    const currentDate = new Date(currentTimestamp);
    return prevDate.toDateString() !== currentDate.toDateString();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default"
      }}
    >
      <List sx={{ padding: 0, display: "flex", flexDirection: "column", pb: 4 }}>
        {messages.map((message, index) => {
          const isCurrentUser = message.sender === currentUserUid;
          const showDate = index === 0 || isNewDay(messages[index - 1].timestamp, message.timestamp);

          return (
            <Fragment key={message.messageId}>
              {showDate && <DateSeparator>{new Date(message.timestamp).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</DateSeparator>}
              <MessageBubble 
                iscurrentuser={isCurrentUser} 
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                <Typography
                  variant="body1"
                  sx={{
                    wordWrap: "break-word",
                    fontSize: "0.95rem",
                    lineHeight: 1.5
                  }}
                >
                  {message.text}
                </Typography>
                <TimestampTypography variant="caption" iscurrentuser={isCurrentUser}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </TimestampTypography>
              </MessageBubble>
            </Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default MessageList;
