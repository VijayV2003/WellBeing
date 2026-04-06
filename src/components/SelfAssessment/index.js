import React, { useState } from "react";
import questions from "./questions.json";
import { 
  Typography, 
  Button, 
  Box, 
  Paper, 
  LinearProgress, 
  Grid, 
  Container
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ScoreModal from "./ScoreModal";
import { motion, AnimatePresence } from "framer-motion";

const OptionTile = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '20px',
  border: '2px solid',
  borderColor: selected ? theme.palette.primary.main : 'transparent',
  backgroundColor: selected ? 'rgba(0, 133, 121, 0.05)' : theme.palette.background.paper,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: selected ? '0 8px 24px rgba(0, 133, 121, 0.15)' : '0 4px 12px rgba(0,0,0,0.03)',
  '&:hover': {
    borderColor: theme.palette.primary.light,
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
  },
}));

function SelfAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleOptionSelect = (optionValue) => {
    const newAnswers = { ...selectedAnswers, [currentQuestion.id]: optionValue };
    setSelectedAnswers(newAnswers);
    
    // Auto-advance after a short delay for better UX
    if (currentStep < questions.length - 1) {
        setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
        }, 400);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      const val = selectedAnswers[q.id];
      if (val !== undefined) score += val;
    });
    return score;
  };

  const handleFinish = () => {
    setFinalScore(calculateScore());
    setModalOpen(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      {/* Header & Progress */}
      <Box mb={6} textAlign="center">
        <Typography variant="h4" fontWeight={900} gutterBottom color="primary.main">
          Self-Assessment
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Question {currentStep + 1} of {questions.length}
        </Typography>
        <Box sx={{ width: '100%', mt: 2 }}>
           <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                    height: 10, 
                    borderRadius: 5,
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    '& .MuiLinearProgress-bar': { borderRadius: 5 }
                }} 
            />
        </Box>
      </Box>

      {/* Question Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Box mb={4} textAlign="center">
            <Typography variant="h5" fontWeight={800} sx={{ mb: 4, lineHeight: 1.4 }}>
              {currentQuestion.text}
            </Typography>

            <Grid container spacing={2}>
              {currentQuestion.options.map((option) => (
                <Grid item xs={12} key={option.value}>
                  <OptionTile 
                    selected={selectedAnswers[currentQuestion.id] === option.value}
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    <Typography variant="h6" fontWeight={700}>
                      {option.text}
                    </Typography>
                  </OptionTile>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, alignItems: 'center' }}>
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          onClick={handleBack}
          disabled={currentStep === 0}
          sx={{ fontWeight: 700, visibility: currentStep === 0 ? 'hidden' : 'visible' }}
        >
          Back
        </Button>

        {currentStep === questions.length - 1 ? (
          <Button
            variant="contained"
            size="large"
            onClick={handleFinish}
            disabled={selectedAnswers[currentQuestion.id] === undefined}
            sx={{ 
                px: 4, 
                py: 1.5, 
                borderRadius: '50px', 
                fontWeight: 800,
                boxShadow: '0 8px 24px rgba(0, 133, 121, 0.2)'
            }}
          >
            See Results
          </Button>
        ) : (
          <Box sx={{ width: 100 }} /> /* Spacer */
        )}
      </Box>

      <ScoreModal open={modalOpen} score={finalScore} handleClose={() => setModalOpen(false)} />
    </Container>
  );
}

export default SelfAssessment;
