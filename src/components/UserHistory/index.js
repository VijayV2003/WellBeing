import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../utils/firebase";
import { getMoods } from "../../store/features/mood/moodSlice";
import { fetchHabitsAsync } from "../../store/features/habits/habitsSlice";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Chip
} from "@mui/material";
import { motion } from "framer-motion";
import MoodIcon from "@mui/icons-material/Mood";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import FlagIcon from "@mui/icons-material/Flag";

const UserHistory = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const moodsState = useSelector((state) => state.mood.moods);
  const habitsState = useSelector((state) => state.habits.habits);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  
  const [goals, setGoals] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Safely grab User safely accounting for varying auth shapes
  const uid = authState?.user?.uid || authState?.uid;

  useEffect(() => {
    if (uid) {
      dispatch(getMoods(uid));
      dispatch(fetchHabitsAsync(uid));

      const fetchFirebaseGoals = async () => {
        try {
          let snapshot;
          try {
            snapshot = await firebase
              .firestore()
              .collection("users")
              .doc(uid)
              .collection("goals")
              .get();
          } catch (networkError) {
            // Fallback to cache if offline
            snapshot = await firebase
              .firestore()
              .collection("users")
              .doc(uid)
              .collection("goals")
              .get({ source: "cache" });
          }
          
          const goalsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setGoals(goalsData);
        } catch (error) {
          console.warn("Goals unavailable (offline & no cache yet):", error.message);
          setGoals([]);
        }
      };
      
      fetchFirebaseGoals();
    }
  }, [uid, dispatch]);

  useEffect(() => {
    if (!moodsState && !habitsState && goals.length === 0) return;

    let events = [];

    // Parse Moods
    if (Array.isArray(moodsState)) {
      moodsState.forEach((m) => {
        // Handle varying timestamp forms if any
        let t = m.timestamp || m.date || 0;
        let ms = typeof t === "object" && t.toMillis ? t.toMillis() : new Date(t).getTime();
        events.push({
          id: `mood-${m.id || Math.random()}`,
          type: "mood",
          title: "Logged a Mood",
          details: `Felt: ${m.mood || "Neutral"}`,
          time: ms,
          color: "#0ea5e9", // beautiful blue
          icon: <MoodIcon />
        });
      });
    }

    // Parse Habits (Created & Last Checked)
    if (Array.isArray(habitsState)) {
      habitsState.forEach((h) => {
        // Filter out bad timestamps
        if (h.createdAt) {
          let timeCreate = typeof h.createdAt === "object" && h.createdAt.toMillis ? h.createdAt.toMillis() : new Date(h.createdAt).getTime();
          events.push({
            id: `habit-c-${h.id}`,
            type: "habit",
            title: "Started a New Habit",
            details: h.name,
            time: timeCreate,
            color: "#8b5cf6", // rich purple
            icon: <CheckCircleIcon />
          });
        }
        
        if (h.lastUpdated && h.streak > 0) {
            let timeUpdate = typeof h.lastUpdated === "object" && h.lastUpdated.toMillis ? h.lastUpdated.toMillis() : new Date(h.lastUpdated).getTime();
            events.push({
                id: `habit-u-${h.id}-${h.streak}`,
                type: "habit",
                title: `Achieved Habit Streak (${h.streak} days)`,
                details: h.name,
                time: timeUpdate,
                color: "#10b981", // glowing green
                icon: <CheckCircleIcon />
            });
        }
      });
    }

    // Parse Goals
    goals.forEach((g) => {
      if (g.createdAt) {
        let gt = typeof g.createdAt === "object" && g.createdAt.toMillis ? g.createdAt.toMillis() : Number(g.createdAt);
        events.push({
          id: `goal-${g.id}`,
          type: "goal",
          title: g.progress === 100 ? "Completed a Goal" : "Created a Goal",
          details: g.title,
          time: gt,
          color: g.progress === 100 ? "#f59e0b" : "#f43f5e", // gold if complete, bright rose otherwise
          icon: <FlagIcon />
        });
      }
    });

    // Sort descending chronologically (newest at top)
    events.sort((a, b) => b.time - a.time);
    
    setTimelineEvents(events);
    setIsLoading(false);
  }, [moodsState, habitsState, goals]);

  // Clean formatting
  const formatDate = (ms) => {
    if (!ms || isNaN(ms)) return "Unknown Date";
    const d = new Date(ms);
    return d.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight={800} align="center" gutterBottom color="primary.main">
        History Dashboard
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" mb={6}>
        A complete chronological ledger of your well-being journey. Every mood logged, habit built, and goal achieved.
      </Typography>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {timelineEvents.length === 0 && !isLoading && (
          <Typography variant="h6" align="center" color="text.secondary" mt={8}>
            Your history is empty. Start using the tools to build your timeline!
          </Typography>
        )}

        {timelineEvents.map((evt, index) => (
          <motion.div key={evt.id} variants={itemVariants}>
            <Box sx={{ display: 'flex', mb: 4, position: 'relative' }}>
              
              {/* Timeline Track Line */}
              {index !== timelineEvents.length - 1 && (
                <Box sx={{
                  position: 'absolute',
                  left: 27,
                  top: 56,
                  bottom: -32,
                  width: '2px',
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                }} />
              )}

              {/* Icon Marker */}
              <Avatar 
                sx={{ 
                  bgcolor: evt.color, 
                  width: 56, 
                  height: 56, 
                  mr: 3,
                  boxShadow: `0 4px 12px ${evt.color}40`,
                  zIndex: 2
                }}
              >
                {evt.icon}
              </Avatar>

              {/* Event Content Panel */}
              <Paper 
                elevation={0}
                sx={{ 
                  flexGrow: 1, 
                  p: 3, 
                  borderRadius: 4, 
                  backgroundColor: 'background.paper',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                     content: '""',
                     position: 'absolute',
                     left: 0,
                     top: 0,
                     bottom: 0,
                     width: '4px',
                     backgroundColor: evt.color
                  }
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
                  <Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom={false}>
                      {evt.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, fontSize: "1.05rem" }}>
                      {evt.details}
                    </Typography>
                  </Box>
                  <Chip 
                    label={formatDate(evt.time)} 
                    size="small" 
                    variant="outlined" 
                    sx={{ mt: { xs: 2, sm: 0 }, borderRadius: 2 }} 
                  />
                </Box>
              </Paper>

            </Box>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
};

export default UserHistory;
