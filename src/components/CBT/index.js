import React from "react";
import { Container, Typography, Box, Grid, Card, CardContent, Divider, Avatar, Button, Stack, Paper } from "@mui/material";
import { motion } from "framer-motion";
import SmartIcon from '@mui/icons-material/Psychology';
import BehaviorIcon from '@mui/icons-material/AltRoute';
import ResourceIcon from '@mui/icons-material/MenuBook';
import ArrowOutIcon from '@mui/icons-material/OpenInNew';

const CBT = () => {
    const sections = [
      {
        title: "Cognitive Techniques",
        icon: <SmartIcon />,
        color: "#0d9488", // Teal
        description: "Focus on identifying and challenging distorted thought patterns that lead to negative emotions and behaviors.",
        links: [
          { text: "Thought Record Sheet", url: "https://www.getselfhelp.co.uk/docs/ThoughtRecordSheet7.pdf" },
          { text: "Common Cognitive Distortions", url: "https://positivepsychology.com/cognitive-distortions/" }
        ]
      },
      {
        title: "Behavioral Techniques",
        icon: <BehaviorIcon />,
        color: "#6366f1", // Indigo
        description: "Identify and replace unhelpful behaviors with positive routines that promote mental well-being.",
        links: [
          { text: "Systematic Desensitization", url: "https://www.verywellmind.com/what-is-systematic-desensitization-2795459" },
          { text: "Behavioral Activation", url: "https://www.psychologytools.com/resource/behavioral-activation/" }
        ]
      },
      {
        title: "Research & Training",
        icon: <ResourceIcon />,
        color: "#db2777", // Pink
        description: "Deepen your understanding through globally recognized cognitive behavior therapy resources.",
        links: [
          { text: "NHS - CBT Introduction", url: "https://www.nhs.uk/conditions/cognitive-behavioural-therapy-cbt/" },
          { text: "Beck Institute for CBT", url: "https://www.beckinstitute.org/" }
        ]
      }
    ];

    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" fontWeight={900} align="center" gutterBottom color="primary.main">
           CBT Fundamentals
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ maxWidth: 750, mx: 'auto', mb: 8, fontWeight: 400 }}>
          Evidence-based strategies to help you understand and manage the connections between your thoughts, feelings, and behaviors.
        </Typography>

        <Box sx={{ mb: 10 }}>
          <Grid container spacing={4}>
            {sections.map((section, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card sx={{ 
                    height: '100%', 
                    borderRadius: 6,
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.03)",
                    border: "1px solid rgba(0,0,0,0.02)",
                    p: 2
                  }}>
                    <CardContent>
                       <Avatar sx={{ bgcolor: section.color, width: 64, height: 64, mb: 3, boxShadow: `0 8px 25px ${section.color}40` }}>
                          {section.icon}
                       </Avatar>
                       <Typography variant="h5" fontWeight={800} gutterBottom>
                          {section.title}
                       </Typography>
                       <Typography variant="body1" color="text.secondary" sx={{ mb: 3, minHeight: 70 }}>
                          {section.description}
                       </Typography>
                       <Divider sx={{ mb: 3 }} />
                       
                       <Stack spacing={2}>
                          {section.links.map((link, lIdx) => (
                            <Button 
                              key={lIdx}
                              component="a" 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              variant="outlined" 
                              endIcon={<ArrowOutIcon sx={{ fontSize: 16 }} />}
                              sx={{ 
                                justifyContent: 'space-between',
                                borderColor: 'rgba(0,0,0,0.08)',
                                color: 'text.primary',
                                fontWeight: 600,
                                px: 2,
                                py: 1,
                                textTransform: 'none',
                                '&:hover': {
                                  borderColor: section.color,
                                  bgcolor: `${section.color}10`,
                                  color: section.color
                                }
                              }}
                            >
                              {link.text}
                            </Button>
                          ))}
                       </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Informative Quote / Callout */}
        <Paper elevation={0} sx={{ 
          p: 6, 
          borderRadius: 8, 
          bgcolor: 'rgba(0,133,121,0.05)', 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
           <Box sx={{ position: 'relative', zIndex: 1 }}>
             <Typography variant="h5" fontWeight={800} color="primary.dark" gutterBottom>
               Professional Guidance
             </Typography>
             <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
               Remember that while these resources are evidence-based, they are meant to supplement professional care. 
               If you're in crisis, please use our **AI Counselor** chatbot for immediate support or reach out to a certified professional.
             </Typography>
           </Box>
           <Box sx={{ 
             position: 'absolute', 
             top: -20, 
             left: -20, 
             width: 150, 
             height: 150, 
             borderRadius: '50%', 
             bgcolor: 'rgba(0,133,121,0.03)' 
           }} />
        </Paper>
      </Container>
    );
};

export default CBT;
