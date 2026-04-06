import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import firebase from "../../../utils/firebase";
import { styled } from "@mui/material/styles";
import { Button, TextField, Box, Typography, IconButton, InputAdornment, Fade } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
  maxWidth: "460px",
  padding: "48px 40px",
  borderRadius: "32px",
  background: "#fff",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  margin: "20px",
}));

const Logo = styled("img")({
  width: "120px",
  height: "120px",
  marginBottom: "24px",
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
  marginBottom: "16px",
}));

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      
      const userSnapshot = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();
      if (!userSnapshot.empty) {
        throw new Error("Username already exists");
      }

      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await user.updateProfile({
        displayName: username,
      });

      await firebase.firestore().collection("users").doc(user.uid).set({
        email,
        username,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
            Create Account
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "text.secondary", fontWeight: 500 }}>
            Join the community of mindful growth
          </Typography>

          {error && (
            <Typography variant="body2" sx={{ color: "#ff5252", mb: 3, fontWeight: 700, bgcolor: "rgba(255, 82, 82, 0.05)", py: 1, borderRadius: "8px" }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleJoin}>
            <StyledTextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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

            <StyledTextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                mt: 1,
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
              {loading ? "Creating account..." : "Get Started"}
            </Button>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Typography
                component={Link}
                to="/login"
                sx={{
                  color: "primary.main",
                  fontWeight: 800,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                Sign In
              </Typography>
            </Typography>
          </Box>
        </SoftCard>
      </Fade>
    </AuthPage>
  );
};


export default Join;
