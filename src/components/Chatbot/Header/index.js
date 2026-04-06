import { Box, Typography, Avatar } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function Header() {
  return (
    <Box 
      sx={{
        height: "80px",
        display: "flex",
        alignItems: "center",
        px: 3,
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        zIndex: 10
      }}
    >
      <Avatar 
        sx={{ 
          bgcolor: "primary.main", 
          mr: 2,
          boxShadow: "0 4px 12px rgba(0, 133, 121, 0.2)" 
        }}
      >
        <SmartToyIcon />
      </Avatar>
      <Box>
        <Typography variant="h6" fontWeight={800} color="text.primary" sx={{ lineHeight: 1.2 }}>
          AI Counselor
        </Typography>
        <Typography variant="caption" color="primary.main" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
          • Always Active
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;
