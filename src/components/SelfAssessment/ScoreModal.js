import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createMood } from "../../store/features/mood/moodSlice";
import MoodLoggedModal from "./MoodLoggedModal";
import { useNavigate } from "react-router-dom";

function ScoreModal({ open, score, handleClose }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.uid);
  const moodValue = Math.round(score / 4);
  const [moodLogged, setMoodLogged] = useState(false);
  const navigate = useNavigate();

  const handleMoodLogging = async (e) => {
    e.preventDefault();
    try {
      const moodData = {
        mood: moodValue,
        userId: userId,
        date: new Date(),
      };
      await dispatch(createMood(moodData));
      setMoodLogged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVisitMoodJournal = () => {
    navigate("/mood-tracker");
    console.log("Visit Mood Journal");
  };

  function getMoodMessage(score) {
    if (score >= 0 && score <= 10) {
      return "You should seek support!";
    } else if (score >= 11 && score <= 20) {
      return "You might need some help!";
    } else if (score >= 21 && score <= 30) {
      return "You're doing well!";
    } else if (score >= 31 && score <= 40) {
      return "You're feeling great!";
    }
  }

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{
            sx: { borderRadius: '24px', p: 3, textAlign: 'center' }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" fontWeight={900} color="primary.main">
            Assessment Results
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box 
            sx={{ 
                my: 4, 
                p: 4, 
                borderRadius: '50%', 
                width: 140, 
                height: 140, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                mx: 'auto',
                border: '8px solid',
                borderColor: 'primary.light',
                backgroundColor: 'rgba(0, 133, 121, 0.05)'
            }}
          >
            <Typography variant="h3" fontWeight={900} color="primary.dark">
              {moodValue}
            </Typography>
            <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase' }}>
              Score / 10
            </Typography>
          </Box>

          <Typography variant="h6" fontWeight={800} gutterBottom>
            {getMoodMessage(score)}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Based on your responses, we recommend logging this mood to your personal tracker.
          </Typography>

          <Stack spacing={2} direction="column">
            <Button 
                variant="contained" 
                fullWidth
                size="large"
                onClick={handleMoodLogging} 
                sx={{ borderRadius: '50px', fontWeight: 800, py: 1.5, boxShadow: '0 8px 24px rgba(0, 133, 121, 0.2)' }}
            >
              Log to Mood Journal
            </Button>
            <Button 
                variant="text" 
                fullWidth
                onClick={handleClose}
                sx={{ fontWeight: 700, color: 'text.secondary' }}
            >
              Return to Tools
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <MoodLoggedModal
        open={moodLogged}
        moodValue={moodValue}
        handleClose={() => {
          setMoodLogged(false);
          handleClose();
        }}
        handleVisitMoodJournal={handleVisitMoodJournal}
      />
    </>
  );
}

export default ScoreModal;
