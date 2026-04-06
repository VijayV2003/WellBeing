import React from "react";
import { Container, Typography, Box, Grid, Card, CardContent, Divider, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import WellnessIcon from '@mui/icons-material/SelfImprovement';
import ExerciseIcon from '@mui/icons-material/DirectionsRun';
import PeopleIcon from '@mui/icons-material/Group';
import BedtimeIcon from '@mui/icons-material/Bedtime';

const CopingStrategies = () => {
    const strategies = [
      {
        title: "1. Exercise",
        icon: <ExerciseIcon />,
        color: "#10b981", // Green
        description: "Exercise releases endorphins, which are natural mood boosters, helping you feel more relaxed and calm.",
        items: ["Going for a walk or run", "Joining a fitness class", "Yoga or Pilates", "Playing a sport"]
      },
      {
        title: "2. Mindfulness",
        icon: <WellnessIcon />,
        color: "#0ea5e9", // Blue
        description: "Focusing on the present instead of worrying about the future or past can reduce anxiety.",
        items: ["Guided Meditation", "Breathing exercises", "Body scan relaxation", "Progressive muscle relaxation"]
      },
      {
        title: "3. Connect with Others",
        icon: <PeopleIcon />,
        color: "#f59e0b", // Gold
        description: "Shared experiences can help you feel supported and less alone in your journey.",
        items: ["Joining a support group", "Talking to a trusted friend", "Volunteering locally", "Attending social events"]
      },
      {
        title: "4. Restorative Sleep",
        icon: <BedtimeIcon />,
        color: "#8b5cf6", // Purple
        description: "Quality sleep is crucial for physical and mental health. Rest provides your brain the recovery it needs.",
        items: ["Regular sleep schedule", "Relaxing bedtime routine", "No screens 1 hour before bed", "Avoiding caffeine late in the day"]
      }
    ];

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    };

    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" fontWeight={900} align="center" gutterBottom color="primary.main">
           Coping Toolbox
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 8, fontWeight: 400 }}>
          Practical strategies and techniques to help you navigate through moments of stress or anxiety.
        </Typography>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={4}>
            {strategies.map((strategy, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div 
                  variants={{ 
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8 }}
                >
                  <Card sx={{ 
                    height: '100%', 
                    borderRadius: 6,
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.03)",
                    border: "1px solid rgba(0,0,0,0.02)",
                    overflow: 'hidden'
                  }}>
                    <CardContent sx={{ p: 4 }}>
                       <Box display="flex" alignItems="center" mb={3}>
                         <Avatar sx={{ bgcolor: strategy.color, width: 56, height: 56, mr: 2, boxShadow: `0 8px 20px ${strategy.color}30` }}>
                            {strategy.icon}
                         </Avatar>
                         <Typography variant="h5" fontWeight={800}>
                            {strategy.title}
                         </Typography>
                       </Box>
                       
                       <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6, fontSize: "1.05rem" }}>
                          {strategy.description}
                       </Typography>

                       <Divider sx={{ mb: 3 }} />

                       <Typography variant="h6" fontWeight={700} sx={{ mb: 2, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: 1, color: "primary.main" }}>
                          Actionable Steps
                       </Typography>

                       <Grid container spacing={1}>
                          {strategy.items.map((item, idx) => (
                            <Grid item xs={6} key={idx}>
                               <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: strategy.color, mr: 1.5 }} />
                                  <Typography variant="body2" fontWeight={500} color="text.primary">
                                     {item}
                                  </Typography>
                               </Box>
                            </Grid>
                          ))}
                       </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    );
};

export default CopingStrategies;
