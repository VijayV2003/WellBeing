import { useState } from "react";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  NavigationBarMenu,
  NavigationBarTitle,
  NavigationLinks,
  NavigationDrawer,
} from "./StyledComponent";
import darkTheme from "../../theme/darkTheme";
import lightTheme from "../../theme";


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  height: theme.customAppBarHeight,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(12px)',
  webkitBackdropFilter: 'blur(12px)',
  boxShadow: theme.palette.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.05)',
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
  transition: 'all 0.3s ease',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
}));

// Main navigation bar component
const NavigationBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const myTheme = darkMode ? darkTheme : lightTheme;

  // Handler for opening the navigation drawer
  const openDrawer = () => {
    setIsOpenMenu(true);
  };

  // Handler for closing the navigation drawer
  const closeDrawer = () => {
    setIsOpenMenu(false);
  };

  // Handler for mouse leaving the navigation bar
  const handleMouseLeave = () => {
    setIsOpenMenu(false);
  };

  theme.customAppBarHeight = isMobile ? "50px" : "64px";

  return (
    <StyledAppBar position="sticky" onMouseLeave={handleMouseLeave}>
      <Toolbar>
        <NavigationBarMenu isOpenMenu={isOpenMenu} openDrawer={openDrawer} myTheme={myTheme} />
        <NavigationBarTitle />
        <NavigationLinks user={user} myTheme={myTheme} />
      </Toolbar>
      <NavigationDrawer user={user} isOpenMenu={isOpenMenu} closeDrawer={closeDrawer} myTheme={myTheme} />
    </StyledAppBar>
  );
};

export default NavigationBar;
