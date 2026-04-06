import React, { useState, useEffect, useRef } from "react";
import "./GuidedMeditation.css";
import audioFiles from "../../data/audioFiles";
import {
    CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { getDisplayName as formatDisplayName } from "../../utils/helper";
import { motion, AnimatePresence } from "framer-motion";

const GuidedMeditation = () => {
    const [currentAudio, setCurrentAudio] = useState(audioFiles[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => console.log("Playback error:", error));
                }
            }
        }
    }, [currentAudio, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => console.log("Playback error:", error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handlePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleAudioEnd = () => {
        setPosition(0);
        setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setPosition(audioRef.current.currentTime * 1000);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration * 1000);
        }
    };

    return (
      <Box className="guided-meditation-page">
        {/* IMMERSIVE BACKGROUND CROSS-FADE */}
        <Box className="meditation-bg-container">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentAudio.backgroundImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="meditation-bg-image ken-burns"
                    style={{ backgroundImage: `url(${currentAudio.backgroundImage})` }}
                />
            </AnimatePresence>
        </Box>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Box className="guidedMeditation-container">
              <Box className="guidedMeditation__header">
                <Typography variant="h4" fontWeight={900} gutterBottom sx={{ color: "white" }}>
                  Serenity Player
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", mb: 4, fontWeight: 500 }}>
                   Find your calm in this space.
                </Typography>

                <FormControl fullWidth variant="outlined">
                  <InputLabel id="audio-select-label" sx={{ color: 'rgba(255,255,255,0.7)', "&.Mui-focused": { color: "#4db6ac" } }}>Choose Experience</InputLabel>
                  <Select
                    labelId="audio-select-label"
                    value={selectedIndex}
                    label="Choose Experience"
                    onChange={(e) => {
                      const idx = e.target.value;
                      setSelectedIndex(idx);
                      setCurrentAudio(audioFiles[idx]);
                    }}
                    sx={{ 
                        borderRadius: "16px", 
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.4)" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4db6ac" },
                        "& .MuiSvgIcon-root": { color: "white" }
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: '#1a1a1a',
                                color: 'white',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                mt: 1
                            }
                        }
                    }}
                  >
                    {audioFiles.map((audio, index) => (
                      <MenuItem key={index} value={index} sx={{ "&:hover": { bgcolor: "rgba(77, 182, 172, 0.1)" } }}>
                        {formatDisplayName(audio.url)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box className="guidedMeditation_audio" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <audio
                  ref={audioRef}
                  src={currentAudio.url}
                  onEnded={handleAudioEnd}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                />

                <CircularProgressbarWithChildren
                  value={position}
                  maxValue={duration || 100}
                  strokeWidth={4}
                  styles={{
                    path: {
                      stroke: "#4db6ac",
                      strokeLinecap: "round",
                      transition: "stroke-dashoffset 0.5s ease 0s",
                      filter: 'drop-shadow(0 0 5px rgba(77, 182, 172, 0.5))'
                    },
                    trail: {
                      stroke: "rgba(255,255,255,0.1)",
                      strokeLinecap: "round",
                    },
                  }}
                >
                  <Button 
                    onClick={handlePlayPause}
                    variant="contained"
                    className={isPlaying ? "pulse" : ""}
                    sx={{
                      width: 110,
                      height: 110,
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      color: "#008579",
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    {isPlaying ? (
                      <PauseRoundedIcon sx={{ fontSize: 60 }} />
                    ) : (
                      <PlayArrowRoundedIcon sx={{ fontSize: 60 }} />
                    )}
                  </Button>
                </CircularProgressbarWithChildren>
              </Box>

              <Box mt={4}>
                 <Typography variant="h6" fontWeight={800} sx={{ color: "white", letterSpacing: 0.5 }}>
                    {formatDisplayName(currentAudio.url)}
                 </Typography>
                 <Typography variant="body2" sx={{ color: "rgba(77, 182, 172, 0.8)", fontWeight: 700, textTransform: 'uppercase', mt: 1, letterSpacing: 1.5 }}>
                    {isPlaying ? "Focusing..." : "Ready to start"}
                 </Typography>
              </Box>
          </Box>
        </motion.div>
      </Box>
    );
};

export default GuidedMeditation;
