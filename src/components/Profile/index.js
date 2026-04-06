import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  Container, Typography, Box, Card, CardContent, 
  List, ListItem, ListItemText, ListItemIcon, Avatar, 
  Button, Paper, Grid, Stack, Chip, Snackbar, Alert, CircularProgress 
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import DarkModeSwitch from "./settings/DarkModeSwitch";
import EmailNotificationToggle from "./settings/EmailNotificationToggle";
import PushNotificationToggle from "./settings/PushNotificationToggle";
import { seedDemoData } from "../../utils/demoSeed";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [demoLoading, setDemoLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSeedDemo = async () => {
      if (!user?.uid) return;
      setDemoLoading(true);
      try {
          await seedDemoData(user.uid);
          setShowSuccess(true);
      } catch (err) {
          console.error(err);
      } finally {
          setDemoLoading(false);
      }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box mb={4} textAlign="center">
        <Typography variant="h3" fontWeight={900} gutterBottom color="primary.main">
          Account Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your profile, notifications, and preferences.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* User Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ 
            p: 4, 
            borderRadius: 6, 
            textAlign: 'center', 
            border: '1px solid', 
            borderColor: 'divider',
            background: 'linear-gradient(180deg, rgba(0, 133, 121, 0.05) 0%, #fff 100%)'
          }}>
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                mx: 'auto', 
                mb: 2, 
                bgcolor: 'primary.main',
                fontSize: '2.5rem',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(0, 133, 121, 0.2)'
              }}
            >
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "?"}
            </Avatar>
            <Typography variant="h5" fontWeight={800}>
               {user?.displayName || "WellBeing User"}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
               {user?.email}
            </Typography>
            <Box mt={3}>
               <Chip label="Premium Member" color="primary" size="small" sx={{ fontWeight: 700, px: 1 }} />
            </Box>
          </Paper>

          {/* Demo Mode Button */}
          <Card sx={{ mt: 3, borderRadius: 6, border: '2px dashed', borderColor: 'primary.light', bgcolor: 'rgba(0, 133, 121, 0.02)', boxShadow: 'none' }}>
            <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                    <AutoFixHighIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                        Demo mode
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Populate your account with 14 days of realistic sample data to see the platform in action.
                    </Typography>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={handleSeedDemo}
                        disabled={demoLoading}
                        sx={{ borderRadius: '50px', fontWeight: 800, textTransform: 'none' }}
                    >
                        {demoLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Initialize Experience"}
                    </Button>
                </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings Groups */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Preferences Section */}
            <Card sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 2, px: 3, bgcolor: 'rgba(0,0,0,0.01)', borderBottom: '1px solid', borderColor: 'divider' }}>
                   <Typography variant="subtitle2" fontWeight={800} sx={{ textTransform: 'uppercase', letterSpacing: 1, color: 'text.secondary' }}>
                      Appearance & Experience
                   </Typography>
                </Box>
                <List disablePadding>
                  <ListItem sx={{ px: 3, py: 2 }}>
                    <ListItemIcon><SettingsIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Theme Mode" secondary="Switch between dark and light themes" />
                    <DarkModeSwitch />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Notifications Section */}
            <Card sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 2, px: 3, bgcolor: 'rgba(0,0,0,0.01)', borderBottom: '1px solid', borderColor: 'divider' }}>
                   <Typography variant="subtitle2" fontWeight={800} sx={{ textTransform: 'uppercase', letterSpacing: 1, color: 'text.secondary' }}>
                      Alerts & Notifications
                   </Typography>
                </Box>
                <List disablePadding>
                  <ListItem sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <ListItemIcon><NotificationsIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Push Notifications" secondary="Receive real-time app updates" />
                    <PushNotificationToggle />
                  </ListItem>
                  <ListItem sx={{ px: 3, py: 2 }}>
                    <ListItemIcon><EmailIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Email Updates" secondary="Sent to your registered email" />
                    <EmailNotificationToggle />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card sx={{ borderRadius: 6, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 2, px: 3, bgcolor: 'rgba(0,0,0,0.01)', borderBottom: '1px solid', borderColor: 'divider' }}>
                   <Typography variant="subtitle2" fontWeight={800} sx={{ textTransform: 'uppercase', letterSpacing: 1, color: 'text.secondary' }}>
                      Privacy & Security
                   </Typography>
                </Box>
                <List disablePadding>
                  <ListItem 
                    button 
                    component={Link} 
                    to="/change-password"
                    sx={{ px: 3, py: 2 }}
                  >
                    <ListItemIcon><LockIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Update Password" secondary="Change your account security credentials" />
                    <ArrowForwardIosIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      
      <Snackbar open={showSuccess} autoHideDuration={6000} onClose={() => setShowSuccess(false)}>
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%', borderRadius: '12px', fontWeight: 700 }}>
          Experience initialized! Your trackers and feed now contain 14 days of realistic sample data.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;
