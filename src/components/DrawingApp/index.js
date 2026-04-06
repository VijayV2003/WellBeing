import React, { useState } from "react";
import "./DrawingApp.css";
import Canvas from "./Canvas";
import Controls from "./Controls";
import useDrawing from "./useDrawing";
import { Box } from "@mui/material";

import { useRef } from "react";

const DrawingApp = () => {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const containerRef = useRef(null);

  const {
    canvasRef,
    contextRef,
    startDrawing,
    finishDrawing,
    draw,
    handleTouchEvent,
    exportCanvasAsJPG,
    clearCanvas,
    save,
    undo,
    redo,
  } = useDrawing(color, brushSize);

  return (
    <Box 
      className="drawingApp" 
      ref={containerRef} 
      sx={{ 
          height: `calc(100vh - 80px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f9f9f9",
          position: "relative",
          overflow: "hidden"
      }}
    >
      <Box sx={{
          bgcolor: "#fff",
          borderRadius: "24px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.05)",
          overflow: "hidden",
          lineHeight: 0
      }}>
        <Canvas 
          canvasRef={canvasRef} 
          startDrawing={startDrawing} 
          finishDrawing={finishDrawing} 
          draw={draw} 
          handleTouchEvent={handleTouchEvent} 
        />
      </Box>

      <Controls
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        contextRef={contextRef}
        exportCanvasAsJPG={exportCanvasAsJPG}
        clearCanvas={clearCanvas}
        save={save}
        undo={undo}
        redo={redo}
      />
    </Box>
  );
};

export default DrawingApp;
