import MenuIcon from "@mui/icons-material/Menu";
import links from "../../utils/links.json";
import renderLinks from "../renderLinks/index.js";
import { IconButton, Drawer, List, Box, Typography, Avatar, Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, updateDarkMode } from "../../../store/features/darkMode/darkModeSlice";

// Styled component for NavLink with hover effect
const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  margin: "0 16px",
  position: 'relative',
  color: 'inherit',
  transition: 'all 0.3s ease',
  "& .MuiTypography-root": {
    fontWeight: 700,
    transition: 'all 0.3s ease',
  },
  "&:hover": {
    transform: 'translateY(-2px)',
    "& .MuiTypography-root": {
      color: theme.palette.primary.main,
    },
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
    backgroundColor: theme.palette.primary.main,
    transition: 'all 0.3s ease',
  },
  "@media(max-width: 900px)": {
    margin: "12px 0",
    "&:after": { display: 'none' }
  },
}));

// Component for menu icon
export const NavigationBarMenu = ({ isOpenMenu, openDrawer }) => (
  <IconButton edge="start" color="inherit" aria-label="menu" onClick={openDrawer} sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
    <MenuIcon />
  </IconButton>
);

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    dispatch(setDarkMode(newMode));
    dispatch(updateDarkMode(newMode));
  };

  return (
    <IconButton onClick={toggleDarkMode} color="inherit" sx={{ ml: 1, p: 1 }}>
      {darkMode ? (
        <LightModeIcon sx={{ color: '#ffb300' }} />
      ) : (
        <DarkModeIcon sx={{ color: '#3f51b5' }} />
      )}
    </IconButton>
  );
};

const UserAvatarMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
     handleClose();
     window.location.href = "/logout";
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 1 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar 
          sx={{ 
            width: 40, 
            height: 40, 
            bgcolor: 'primary.main',
            fontWeight: 800,
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(0, 133, 121, 0.2)'
          }}
        >
          {user?.displayName ? user.displayName.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : "?")}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            borderRadius: '16px',
            minWidth: '200px',
            border: '1px solid rgba(0,0,0,0.05)',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
           <Typography variant="subtitle1" fontWeight={800}>{user?.displayName || "WellBeing User"}</Typography>
           <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
        </Box>
        <Divider />
        <MenuItem component={Link} to="/profile" sx={{ py: 1.5, fontWeight: 600 }}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" color="primary" />
          </ListItemIcon>
          User Preferences
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, fontWeight: 600, color: 'error.main' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

// Component for navigation bar title
export const NavigationBarTitle = () => (
  <NavLink to="/" sx={{ "&:after": { display: 'none' }, "&:hover": { transform: 'none' } }}>
    <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: -0.5, color: 'primary.main' }}>
      Well<Box component="span" sx={{ color: 'text.primary' }}>Being</Box>
    </Typography>
  </NavLink>
);

// Component for navigation links
export const NavigationLinks = ({ user }) => (
  <Box
    sx={{
      display: { xs: "none", sm: "none", md: "flex" },
      flexGrow: 1,
      justifyContent: "flex-end",
      alignItems: "center"
    }}
  >
    {user ? (
       <>
         {renderLinks(links.user)}
         <DarkModeToggle />
         <UserAvatarMenu user={user} />
       </>
    ) : (
      <>
        {renderLinks(links.guest)}
        <DarkModeToggle />
      </>
    )}
  </Box>
);

// Component for navigation drawer
export const NavigationDrawer = ({ user, isOpenMenu, closeDrawer }) => (
  <Drawer
    anchor="left"
    open={isOpenMenu}
    onClose={closeDrawer}
  >
    <Box sx={{ width: '280px', p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NavigationBarTitle />
        <DarkModeToggle />
      </Box>
      <Divider sx={{ my: 2 }} />
      <List
        component={Box}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1
        }}
      >
        {user
          ? renderLinks(links.user, closeDrawer)
          : renderLinks(links.guest, closeDrawer)}
      </List>
      
      {user && (
        <Box sx={{ mt: 'auto' }}>
            <Divider sx={{ mb: 2 }} />
            <MenuItem component={Link} to="/profile" onClick={closeDrawer} sx={{ borderRadius: '12px', mb: 1, fontWeight: 700 }}>
                User Preferences
            </MenuItem>
            <MenuItem component={Link} to="/logout" onClick={closeDrawer} sx={{ borderRadius: '12px', fontWeight: 700, color: 'error.main' }}>
                Logout
            </MenuItem>
        </Box>
      )}
    </Box>
  </Drawer>
);
