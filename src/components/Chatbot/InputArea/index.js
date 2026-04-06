import { Box, TextField, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function InputArea({ message, setMessage, sendMessage }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box 
        sx={{ 
            p: 3, 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            borderTop: "1px solid", 
            borderColor: "divider",
            backgroundColor: "background.paper",
            zIndex: 10
        }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#f9f9f9",
          borderRadius: "24px",
          p: "4px 8px",
          border: "1px solid transparent",
          transition: "all 0.3s",
          "&:focus-within": {
            backgroundColor: "#fff",
            borderColor: "primary.main",
            boxShadow: "0 0 10px rgba(0, 133, 121, 0.1)"
          }
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message..."
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          multiline
          maxRows={4}
          sx={{ ml: 2, flex: 1 }}
          InputProps={{
            disableUnderline: true,
            sx: { py: 1, fontSize: '1rem', fontWeight: 500 }
          }}
        />
        <IconButton 
          onClick={sendMessage} 
          disabled={!message.trim()}
          sx={{ 
            bgcolor: message.trim() ? "primary.main" : "transparent", 
            color: message.trim() ? "white" : "text.disabled",
            "&:hover": { bgcolor: "primary.dark", color: "white" },
            transition: "all 0.2s",
            ml: 1,
            p: 1
          }}
        >
          <SendIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default InputArea;
