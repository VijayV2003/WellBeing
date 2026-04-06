import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Menu, MenuItem } from "@mui/material";

const DesktopDropdown = ({ title, items }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDesktop, setOpenDesktop] = useState(false);

  const handleMouseEnter = (event) => {
    console.log("handleMouseEnter");
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
    if (!openDesktop) {
      setOpenDesktop(true);
    }
  };

  const handleMouseLeave = () => {
    console.log("handleMouseLeave");
    if (anchorEl !== null) {
      setAnchorEl(null);
    }
    if (openDesktop) {
      setOpenDesktop(false);
    }
  };

  return (
    <Box 
        component="div" 
        onMouseLeave={handleMouseLeave}
        sx={{ display: 'flex', alignItems: 'center' }}
    >
      <Box
        onMouseEnter={handleMouseEnter}
        sx={{
          cursor: "pointer",
          padding: "0 16px",
          marginTop: "0.5rem",
          fontWeight: 700,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'all 0.3s ease',
          color: openDesktop ? 'primary.main' : 'inherit',
          "&:hover": {
            color: 'primary.main',
            transform: 'translateY(-2px)',
            "&:after": {
              width: '100%',
              left: 0,
            }
          },
          "&:after": {
            content: '""',
            position: 'absolute',
            bottom: -4,
            left: '50%',
            width: 0,
            height: '2px',
            backgroundColor: 'primary.main',
            transition: 'all 0.3s ease',
          },
        }}
      >
        <Typography variant="body1" fontWeight="inherit">{title}</Typography>
        <ExpandMoreIcon 
            sx={{ 
                fontSize: '18px', 
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: openDesktop ? 'rotate(180deg)' : 'rotate(0deg)',
                color: openDesktop ? 'primary.main' : 'rgba(0,0,0,0.3)'
            }} 
        />
      </Box>
      <Menu 
        open={openDesktop} 
        anchorEl={anchorEl} 
        onClose={handleMouseLeave} 
        MenuListProps={{ onMouseLeave: handleMouseLeave, sx: { py: 1 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionProps={{ timeout: 400 }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            minWidth: '220px',
            borderRadius: '20px',
            overflow: 'visible',
            /* WellBeing Glass Style */
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            webkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 10,
              height: 10,
              bgcolor: 'rgba(255, 255, 255,0.85)',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        {items.map((item) => (
          <MenuItem 
            key={item.path} 
            component={Link} 
            to={item.path} 
            onClick={handleMouseLeave}
            sx={{
                mx: 1,
                my: 0.5,
                borderRadius: '12px',
                py: 1.5,
                px: 2,
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                "&:hover": {
                    backgroundColor: 'rgba(0, 133, 121, 0.08)',
                    color: 'primary.main',
                    transform: 'translateX(4px)'
                }
            }}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DesktopDropdown;
