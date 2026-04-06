import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MobileDropdown from "../MobileDropdown";
import DesktopDropdown from "../DesktopDropdown";
import { Typography } from "@mui/material";

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  margin: "0 16px",
  position: 'relative',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  "&:hover": {
    transform: 'translateY(-2px)',
    "& .MuiTypography-root": {
      color: theme.palette?.primary?.main || '#008579',
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
    backgroundColor: theme.palette?.primary?.main || '#008579',
    transition: 'all 0.3s ease',
  },
  "@media(max-width: 900px)": {
    margin: "12px 0",
    "&:after": { display: 'none' }
  },
}));

const Dropdown = ({ title, items, closeDrawer }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <MobileDropdown title={title} items={items} closeDrawer={closeDrawer} onClick={(e) => e.stopPropagation()} />
  ) : (
    <DesktopDropdown title={title} items={items} />
  );
};

const renderLinks = (dropdowns, closeDrawer) => {
  return (
    <>
      {dropdowns.map((dropdown) => {
        if (dropdown.items) {
          return <Dropdown key={dropdown.category} title={dropdown.category} items={dropdown.items} closeDrawer={closeDrawer} />;
        } else {
          return (
            <NavLink
              key={dropdown.path}
              to={dropdown.path}
              sx={{
                paddingTop: "0.5rem",
              }}
              onClick={closeDrawer}
            >
              <Typography sx={{ color: "body1", fontWeight: "bold" }} key={dropdown.path}>
                {dropdown.text}
              </Typography>
            </NavLink>
          );
        }
      })}
    </>
  );
};

export default renderLinks;
