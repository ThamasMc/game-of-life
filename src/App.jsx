import React, { useState, useEffect } from 'react';
import './App.css';

const numRows = 50;
const numCols = 50;

const generateEmptyGrid = () => {
  return Array.from({ length: numRows }, () => Array(numCols).fill(false));
};

const App = () => {
  const [grid, setGrid] = useState(generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(500);

  useEffect(() => {
    if (running) {
      const intervalId = setInterval(simulate, 1001 - speed);
      return () => clearInterval(intervalId);
    }
  }, [running, speed]);

  const simulate = () => {
    // Implement your Game of Life logic here to update the grid
    // For simplicity, let's randomly set some cells to alive or dead in this example
    const newGrid = grid.map(row =>
      row.map(cell => (Math.random() > 0.7 ? !cell : cell))
    );
    setGrid(newGrid);
  };

  const handleCellClick = (row, col) => {
    // Implement logic to toggle the state of the clicked cell
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? !cell : cell
      )
    );
    setGrid(newGrid);
  };

  const handleStartStop = () => {
    setRunning(!running);
  };

  const intervalValues = [1, 250, 500, 750, 1000]

  const handleClear = () => {
    setGrid(generateEmptyGrid());
  }

  const handleSpeedChange = (e) => {
    const newValue = e.target.value
    const closestValue = intervalValues.reduce((prev, curr) => (
      Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
    ), intervalValues[0]);
    setSpeed(closestValue);
  };

  return (
    <div className="app-container">
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell ? 'alive' : 'dead'}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls-container">
        <button onClick={handleStartStop}>{running ? 'Pause' : 'Start'}</button>
        <button onClick={handleClear}>Clear</button>
        <div>
          <label>Simulation Speed</label>
          <input
             type="range"
             min="1"
             max="1000"
             value={speed}
             onChange={handleSpeedChange}
           />
        </div>
        {/* Add other controls as needed */}
      </div>
    </div>
  );
};

export default App;

