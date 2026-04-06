import React from "react";
import MoodLogging from "./MoodLogging";
import MoodVisualize from "./MoodVisualize";
import { Grid, Container, Typography } from "@mui/material";

const MoodTracker = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
           <Typography variant="h3" fontWeight={800} align="center" gutterBottom color="primary.main">
             Mood Dashboard
           </Typography>
           <Typography variant="body1" align="center" color="text.secondary" mb={6}>
             Track and visualize your daily emotional well-being
           </Typography>
           <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
             <Grid item xs={12} md={5}>
                <MoodLogging />
             </Grid>
             <Grid item xs={12} md={7}>
                <MoodVisualize />
             </Grid>
           </Grid>
        </Container>
    );
};

export default MoodTracker;
