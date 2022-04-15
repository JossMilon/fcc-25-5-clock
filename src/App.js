//Importing style and assets
import "./App.scss";
import "./assets/fonts/DOTMATRI.TTF";

//Importing packages
import { useState, useEffect } from "react";

//Global variables
let timer;

function App() {
  //Declaring component states
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessionDuration, setSessionDuration] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(sessionDuration*3);
  const [breakTime, setBreakTime] = useState(false);
  const [onPause, setOnPause] = useState(true);
  //Declaring local variables
  const minutes = Math.round((timeRemaining - timeRemaining%60)/60);
  const seconds = timeRemaining%60;
  //Declaring handle functions
  const handleReset = () => {
    setBreakDuration(5);
    setSessionDuration(25);
    setTimeRemaining(sessionDuration*60)
    setBreakTime(false);
    setOnPause(true);
    clearInterval(timer);
    timer = null;
  };
  const handleStartAndStop = () => {
      const handleCountdown2 = () => {
        setTimeRemaining(timeRemaining => {
          if (timeRemaining === 0) {
            setBreakTime(breakTime => {
              if (breakTime) {
                setTimeRemaining(sessionDuration*60);
                return false;
              }
              else {
                setTimeRemaining(breakDuration*60);
                return true;
              }
            })
          }
          else {
            return timeRemaining - 1;
          }
        })
      }
      const handleStart = () => {
        timer = setInterval(handleCountdown2, 1000);
        setOnPause(!onPause);
      };
      const handlePause = () => {
        clearInterval(timer);
        timer = null;
        setOnPause(!onPause);
      };
      if (!timer) {
        handleStart();
      }
      else {
        handlePause();
      }
  }
  useEffect(() => {
    setTimeRemaining(sessionDuration*60);
  }, [sessionDuration])
  return (
    <div className="App">
      <div className="durationController" id="break-label">
        <h2>BREAK LENGTH</h2>
        <label id="break-length">{breakDuration}</label>
        <div className="controls">
          <button onClick={() => breakDuration > 0? setBreakDuration(breakDuration - 1) : 0} id="break-decrement">-</button>
          <button onClick={() => breakDuration < 60? setBreakDuration(breakDuration + 1) : 60} id="break-increment">+</button>
        </div>
      </div>
      <div className="timer" id="timer-label">
        <h1>{breakTime? "BREAK" :  "SESSION"}</h1>
        <p id="time-left-2">{minutes < 10? "0" + minutes : minutes}:{seconds < 10? "0" + seconds : seconds}</p>
        <div className="startReset">
          <button onClick={handleStartAndStop} id="start_stop">{onPause? "Start" : "Pause"}</button>
          <button onClick={handleReset} id="reset">Reset</button>
        </div>
    </div>
      <div className="durationController" id="session-label">
        <h2>SESSION LENGTH</h2>
        <label id="session-length">{sessionDuration}</label>
        <div className="controls">
          <button onClick={() => sessionDuration > 0? setSessionDuration(sessionDuration - 1) : 0} id="session-decrement">-</button>
          <button onClick={() => sessionDuration < 60? setSessionDuration(sessionDuration + 1) : 60} id="session-increment">+</button>
        </div>
      </div>
      <div className="foot left"></div>
      <div className="foot right"></div>
    </div>
  );
}

export default App;