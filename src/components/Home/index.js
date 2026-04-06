import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";
import slideImages from "./slideImages.json";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90, damping: 15 } },
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", backgroundColor: darkMode ? "#121212" : "#F8FAFC", pb: 12 }}>
      
      {/* HERO SECTION - Solid Green and White Aesthetic */}
      <Box
        sx={{
          background: darkMode 
            ? 'linear-gradient(135deg, #022c26 0%, #001210 100%)' 
            : 'linear-gradient(135deg, #006057 0%, #009e8e 100%)', // Darker, richer professional gradient
          color: "white",
          pt: { xs: 8, md: 16 },
          pb: { xs: 16, md: 22 }, // Increased padding for overlap breathing room
          px: 3,
          textAlign: "center",
          borderRadius: { xs: 0, md: "0 0 40px 40px" },
          boxShadow: darkMode ? '0 15px 40px rgba(0,0,0,0.5)' : '0 15px 40px rgba(0, 96, 87, 0.3)',
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(255,255,255,0.1)"
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 900, 
                letterSpacing: -1.5, 
                mb: 3, 
                color: "white", // Explicitly override theme color
                fontSize: { xs: "3rem", md: "5rem" },
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Well<Box component="span" sx={{ color: "#a7f3d0" }}>Being</Box>
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                opacity: 0.9, 
                lineHeight: 1.6, 
                mb: 6, 
                color: "white", // Explicitly override theme color
                fontWeight: 400, 
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                maxWidth: "600px",
                mx: "auto"
              }}
            >
              Your professional space for clarity. Build resilience, track your habits, and maintain positive emotional momentum every single day.
            </Typography>
            
            <Button 
              component={Link} 
              to="/guided-meditation"
              variant="contained" 
              size="large"
              endIcon={<ArrowForwardIcon sx={{ ml: 1 }} />}
              sx={{ 
                backgroundColor: "white", 
                color: "#006057",
                borderRadius: "999px",
                px: 5,
                py: 2,
                fontWeight: 800,
                fontSize: "1.1rem",
                "&:hover": {
                  backgroundColor: "#f0fdf4",
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 25px rgba(0,0,0,0.15)"
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            >
              Start Your Journey
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* CATEGORIES GRID */}
      <Container maxWidth="lg" sx={{ mt: { xs: -8, md: -12 }, position: "relative", zIndex: 3 }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={4} sx={{ display: "flex", alignItems: "stretch" }}>
            {slideImages.map((slide, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <motion.div variants={itemVariants} style={{ height: "100%" }} whileHover={{ y: -8 }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: darkMode ? "#1E2221" : "#ffffff",
                      boxShadow: darkMode ? '0 10px 30px rgba(0,0,0,0.6)' : '0 15px 35px rgba(0,0,0,0.06)',
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'hidden',
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "6px",
                        background: 'linear-gradient(90deg, #008579, #00C4B3)'
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: { xs: 3, md: 5 } }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: darkMode ? '#ffffff' : '#1A202C', mb: 2 }}>
                        {slide.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: darkMode ? '#A0AEC0' : '#4A5568', mb: 4, lineHeight: 1.6, fontSize: "1.05rem" }}>
                        {slide.description}
                      </Typography>
                      
                      {slide.items && (
                        <Box component="ul" sx={{ listStyleType: "none", p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          {slide.items.map((item, idx) => (
                            <Box component="li" key={idx}>
                              {slide.links && slide.links[idx] ? (
                                <Link
                                  to={slide.links[idx]}
                                  style={{ textDecoration: "none" }}
                                >
                                  <Box 
                                    sx={{ 
                                      display: "flex", 
                                      alignItems: "center", 
                                      p: 2, 
                                      borderRadius: 3,
                                      backgroundColor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,133,121,0.04)",
                                      transition: "all 0.2s ease",
                                      "&:hover": {
                                        backgroundColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,133,121,0.1)",
                                        transform: "translateX(6px)"
                                      }
                                    }}
                                  >
                                    <Box 
                                      sx={{ 
                                        width: 10, 
                                        height: 10, 
                                        borderRadius: '50%', 
                                        backgroundColor: "#008579", 
                                        mr: 2,
                                        boxShadow: "0 0 10px rgba(0, 133, 121, 0.5)"
                                      }} 
                                    />
                                    <Typography
                                      variant="body1"
                                      sx={{ fontWeight: 600, color: darkMode ? "#E2E8F0" : "#2D3748" }}
                                    >
                                      {item}
                                    </Typography>
                                  </Box>
                                </Link>
                              ) : (
                                <Typography variant="body1" sx={{ fontWeight: 500, color: darkMode ? "#CBD5E0" : "#4A5568", pl: 3 }}>
                                  • {item}
                                </Typography>
                              )}
                            </Box>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;