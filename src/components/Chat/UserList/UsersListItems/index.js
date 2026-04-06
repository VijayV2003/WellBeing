import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

const UsersListContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  ".user-link": {
    textDecoration: "none",
    color: "inherit"
  }
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: "16px",
  padding: "16px",
  transition: "all 0.2s ease",
  border: "1px solid transparent",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "rgba(0, 133, 121, 0.04)",
    borderColor: "rgba(0, 133, 121, 0.1)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
  },
}));

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

const UsersListItems = ({ users }) => (
  <UsersListContainer component="div">
    {users.map((user) => (
      <motion.div 
        key={user.uid} 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link to={`/chat/${user.uid}`} className="user-link">
          <StyledListItem disablePadding>
            <ListItemAvatar>
              <Avatar 
                sx={{ 
                   bgcolor: "primary.main", 
                   fontWeight: 700,
                   width: 48,
                   height: 48,
                   mr: 2,
                   boxShadow: "0 4px 12px rgba(0, 133, 121, 0.2)"
                }}
              >
                {user.username ? user.username.charAt(0).toUpperCase() : "?"}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight={800} color="text.primary">
                    {user.username}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
                    {user.lastMessage && formatDate(user.lastMessage.timestamp)}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "text.secondary",
                    mt: 0.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "250px"
                  }}
                >
                  {user.lastMessage
                    ? user.lastMessage.text
                    : "Start a conversation"}
                </Typography>
              }
            />
          </StyledListItem>
        </Link>
      </motion.div>
    ))}
  </UsersListContainer>
);

export default UsersListItems;
