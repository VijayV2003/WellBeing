/**
 * A functional component that renders a message input form.
 * @param {string} messageText - The current value of the message input.
 * @param {function} setMessageText - A function to update the message input.
 * @param {function} handleSendMessage - A function to handle sending the message when the form is submitted.
 * @returns {JSX.Element} - The message input form.
 */

import React from "react";
import { Box, TextField, InputAdornment, Button } from "@mui/material";

const MessageForm = ({ messageText, setMessageText, handleSendMessage, receiverDisplayName }) => (
  <Box 
    component="form" 
    onSubmit={handleSendMessage} 
    sx={{ 
      p: 2, 
      backgroundColor: 'background.paper', 
      borderTop: '1px solid', 
      borderColor: 'divider',
      display: 'flex',
      alignItems: 'center'
    }}
  >
    <TextField
      value={messageText}
      onChange={(e) => setMessageText(e.target.value)}
      placeholder={`Message ${receiverDisplayName}...`}
      fullWidth
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "24px",
          backgroundColor: "rgba(0,0,0,0.02)",
          "& fieldset": { borderColor: "transparent" },
          "&:hover fieldset": { borderColor: "primary.light" },
          "&.Mui-focused fieldset": { borderColor: "primary.main" }
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button 
              type="submit" 
              variant="contained" 
              disabled={!messageText.trim()}
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
  </Box>
);

export default MessageForm;
