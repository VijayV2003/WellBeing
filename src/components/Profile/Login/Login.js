import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, TextField, Box, Typography, IconButton, InputAdornment, Fade } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import firebase from "../../../utils/firebase";
import { login } from "../../../store/features/auth/authSlice.js";
import logo from "../../../assets/images/logo.png";

import { motion } from "framer-motion";

const AuthPage = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#fff",
}));

const SoftCard = styled(motion.div)(({ theme }) => ({
  position: "relative",
  zIndex: 3,
  width: "100%",
  maxWidth: "420px",
  padding: "48px 40px",
  borderRadius: "32px",
  background: "#fff",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
}));

const Logo = styled("img")({
  width: "140px",
  height: "140px",
  marginBottom: "32px",
  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.1))",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "rgba(0, 133, 121, 0.03)",
    border: "1px solid transparent",
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused": {
        backgroundColor: "#fff",
    }
  },
  "& .MuiInputLabel-root": {
    fontWeight: 600,
    color: "text.secondary",
  },
  marginBottom: "20px",
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      navigate(from);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate(from);
      }
    });
    return () => unsubscribe();
  }, [navigate, from]);

  return (
    <AuthPage>
      <Fade in={true} timeout={1000}>
        <SoftCard
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Logo src={logo} alt="WellBeing Logo" />
          
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: "primary.main", letterSpacing: -0.5 }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary", fontWeight: 500 }}>
            Continue your journey to wellness
          </Typography>

          {error && (
            <Typography variant="body2" sx={{ color: "#ff5252", mb: 3, fontWeight: 700, bgcolor: "rgba(255, 82, 82, 0.05)", py: 1, borderRadius: "8px" }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <StyledTextField
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <StyledTextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                py: 2,
                borderRadius: "16px",
                fontSize: "1.1rem",
                fontWeight: 800,
                textTransform: "none",
                boxShadow: "0 10px 24px rgba(0, 133, 121, 0.2)",
                background: "linear-gradient(90deg, #008579 0%, #00a896 100%)",
                "&:hover": {
                    background: "linear-gradient(90deg, #006b61 0%, #008579 100%)",
                }
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Typography
                component={Link}
                to="/join"
                sx={{
                  color: "primary.main",
                  fontWeight: 800,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                Join WellBeing
              </Typography>
            </Typography>
          </Box>
        </SoftCard>
      </Fade>
    </AuthPage>
  );
};

export default Login;
