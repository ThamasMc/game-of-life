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
  }, [running, speed, grid]);

  const simulate = () => {
      // Create a copy of the current grid to avoid directly modifying the state
    const newGrid = [...grid.map(row => [...row])];

    // Helper function to count live neighbors for a given cell
    const countLiveNeighbors = (row, col) => {
      const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];

      return neighbors.reduce((count, [i, j]) => {
        const newRow = row + i;
        const newCol = col + j;

        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
          count += grid[newRow][newCol] ? 1 : 0;
        }

        return count;
      }, 0);
    };

    // Apply the rules to each cell in the grid
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const liveNeighbors = countLiveNeighbors(row, col);

        if (grid[row][col]) {
          // Live cell rules
          if (liveNeighbors < 2 || liveNeighbors > 3) {
            // Rule 1 and Rule 3
            newGrid[row][col] = false; // Cell dies
          }
          // Rule 2
          // Live cell with 2 or 3 live neighbors lives on
        } else {
          // Dead cell rule
          if (liveNeighbors === 3) {
            // Rule 4
            newGrid[row][col] = true; // Cell becomes alive
          }
        }
      }
    }

    // Update the Grid
    console.log('setting simulation', newGrid);
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

