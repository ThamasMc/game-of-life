import { useState } from 'react'
import "./App.css";

function App() {
  const [playing, setPlaying] = useState(false)

  return (
    <>
      <div>
        <div className="cell">
        </div>
      </div>
      <div>
        <h1>Game of Life</h1>
        <div className="card">
          <button onClick={() => setPlaying(!playing)}>
            { playing ? 'Playing' : 'Paused'}
          </button>
        </div>
      </div>
    </>
  )
}

export default App