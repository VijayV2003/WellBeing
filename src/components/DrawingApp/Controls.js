import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { 
  Button, Slider, Stack, Tooltip, IconButton, 
  Box, Paper, Divider, Typography 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SaveIcon from "@mui/icons-material/Save";
import ImageIcon from "@mui/icons-material/Image";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import PaletteIcon from "@mui/icons-material/Palette";
import { SketchPicker } from "react-color";
import Modal from "./Modal";

// Eraser SVG path (Standardizing)
const EraserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
    <path d="M22 21H7" />
    <path d="m5 11 9 9" />
  </svg>
);

const SidebarWrapper = styled(Paper)(({ theme }) => ({
  position: "fixed",
  right: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "60px",
  padding: "12px 6px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  borderRadius: "30px",
  background: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(255, 255, 255, 0.4)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  zIndex: 1000,
  maxHeight: "90vh",
  overflowY: "auto",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none"
  },
  transition: "all 0.3s ease",
  "&:hover": {
      background: "rgba(255, 255, 255, 0.98)",
      boxShadow: "0 8px 30px rgba(0, 133, 121, 0.15)",
  }
}));

const ToolButton = styled(IconButton)(({ theme, active }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  backgroundColor: active ? "rgba(0, 133, 121, 0.12)" : "transparent",
  color: active ? "#008579" : "#555",
  padding: "8px",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
  "&:hover": {
    backgroundColor: active ? "rgba(0, 133, 121, 0.2)" : "rgba(0, 0, 0, 0.04)",
  },
  transition: "all 0.2s ease",
}));

const ColorDot = styled(Box)(({ theme, bgcolor, active }) => ({
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: bgcolor,
    cursor: "pointer",
    border: active ? "2px solid #008579" : "1px solid rgba(0,0,0,0.1)",
    boxShadow: active ? "0 0 8px rgba(0, 133, 121, 0.3)" : "none",
    transition: "transform 0.2s ease",
    "&:hover": {
        transform: "scale(1.15)",
    }
}));

const QuickPalette = [
    "#000000", // Black
    "#008579", // Primary Teal
    "#FF5252", // Red
    "#4CAF50", // Green
    "#2196F3", // Blue
    "#FFC107", // Amber
    "#FFFFFF", // White
];

const Controls = ({ color, setColor, brushSize, setBrushSize, contextRef, exportCanvasAsJPG, clearCanvas, undo, redo, save }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempColor, setTempColor] = useState(color);
  const [isEraser, setIsEraser] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    if (contextRef.current) {
        contextRef.current.strokeStyle = newColor;
    }
    setIsEraser(newColor === "#FFFFFF");
  };

  const toggleEraser = () => {
      if (isEraser) {
          handleColorChange(tempColor);
      } else {
          setTempColor(color);
          handleColorChange("#FFFFFF");
      }
  };

  return (
    <>
      <SidebarWrapper elevation={0}>
        <Tooltip title="Pen Tool" placement="left">
          <ToolButton active={!isEraser} onClick={() => handleColorChange(tempColor === "#FFFFFF" ? "#000" : tempColor)}>
            <ModeEditRoundedIcon />
          </ToolButton>
        </Tooltip>

        <Tooltip title="Eraser Tool" placement="left">
          <ToolButton active={isEraser} onClick={toggleEraser}>
            <EraserIcon />
          </ToolButton>
        </Tooltip>

        <Divider sx={{ width: "60%", my: 0.5 }} />

        <Stack spacing={1} alignItems="center">
            {QuickPalette.map((c) => (
                <Tooltip key={c} title={c === "#FFFFFF" ? "White" : c} placement="left">
                    <ColorDot 
                        bgcolor={c} 
                        active={color === c} 
                        onClick={() => handleColorChange(c)}
                    />
                </Tooltip>
            ))}
            
            <Tooltip title="Custom Color" placement="left">
              <IconButton size="small" onClick={() => setShowPicker(!showPicker)} sx={{ color: "#666", p: 0.5 }}>
                <PaletteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
        </Stack>

        <Divider sx={{ width: "60%", my: 0.5 }} />

        <Tooltip 
           title={
               <Box sx={{ p: 1 }}>
                   <Typography variant="caption" display="block" textAlign="center" fontWeight={800} mb={1}>
                       Brush: {brushSize}px
                   </Typography>
                   <Slider 
                       orientation="vertical"
                       value={brushSize}
                       min={1}
                       max={30}
                       onChange={(e, val) => {
                           setBrushSize(val);
                           if (contextRef.current) contextRef.current.lineWidth = val;
                       }}
                       sx={{ height: 80, color: "#008579" }}
                   />
               </Box>
           } 
           placement="left"
        >
          <Box sx={{ py: 0.5, cursor: "pointer" }}>
            <Box sx={{ 
                width: 20, 
                height: 20, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                borderRadius: "50%",
                border: "1px solid #eee"
            }}>
                <Box sx={{ 
                    width: Math.max(2, brushSize / 2.5), 
                    height: Math.max(2, brushSize / 2.5), 
                    bgcolor: color, 
                    borderRadius: "50%" 
                }} />
            </Box>
          </Box>
        </Tooltip>

        <Divider sx={{ width: "60%", my: 0.5 }} />

        <Tooltip title="Undo" placement="left">
            <ToolButton onClick={undo}><UndoIcon /></ToolButton>
        </Tooltip>
        <Tooltip title="Redo" placement="left">
            <ToolButton onClick={redo}><RedoIcon /></ToolButton>
        </Tooltip>
        <Tooltip title="Save PNG" placement="left">
            <ToolButton onClick={save}><SaveIcon /></ToolButton>
        </Tooltip>
        <Tooltip title="Save JPG" placement="left">
            <ToolButton onClick={exportCanvasAsJPG}><ImageIcon /></ToolButton>
        </Tooltip>
        
        <Divider sx={{ width: "60%", my: 0.5 }} />

        <Tooltip title="Clear" placement="left">
            <ToolButton onClick={clearCanvas} sx={{ color: "#ff5252" }}><DeleteIcon /></ToolButton>
        </Tooltip>
      </SidebarWrapper>

      {showPicker && (
        <Modal onClose={() => setShowPicker(false)}>
          <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: "16px" }}>
            <SketchPicker 
                color={color} 
                onChangeComplete={(c) => handleColorChange(c.hex)} 
            />
            <Button 
                fullWidth 
                variant="contained" 
                onClick={() => setShowPicker(false)}
                sx={{ mt: 2, borderRadius: "8px", bgcolor: "#008579" }}
            >
                Accept
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Controls;
