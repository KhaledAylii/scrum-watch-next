import "../styles/globals.css";

import { createRef, useEffect, useState } from "react";
import "../styles/App.css";
import Head from "next/head";

function App() {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerInput, setTimerInput] = useState("0:00");

  const timeLabel = () => {
    return `${parseInt(secondsLeft / 60)}:${secondsLeft % 60 < 10 ? "0" : ""}${
      secondsLeft % 60 === 0 ? "0" : secondsLeft % 60
    }`;
  };

  const timer = createRef();

  const handleTimerInputChange = (e) => {
    if (timerStarted) return;
    let result = e.target.value.split(":").join("");
    let newMinutes =
      result.slice(0, -2)[0] === "0"
        ? result.slice(1, -2)
        : result.slice(0, -2);
    result = `${newMinutes ? newMinutes : "0"}:${
      result.slice(-2)?.length === 2 ? result.slice(-2) : "00"
    }`;
    setTimerInput(`${result}`);
  };

  const startTimer = () => {
    setTimerStarted(true);
    if (timerPaused) {
      setTimerPaused(false);
    } else {
      const [minutes, seconds] = timerInput.split(":");
      const totalSecondsLeft = parseInt(minutes) * 60 + parseInt(seconds);
      setSecondsLeft(totalSecondsLeft);
    }
  };

  const stopTimer = () => {
    setTimerStarted(false);
    setTimerPaused(false);
    setSecondsLeft(0);
  };

  const pauseTimer = () => {
    setTimerPaused(true);
    clearTimeout(timer.current);
  };

  useEffect(() => {
    if (secondsLeft > 0 && timerStarted && !timerPaused) {
      timer.current = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (secondsLeft === 0 && timerStarted) {
      pauseTimer();
    }
  }, [timerStarted, secondsLeft, timer]);

  const timerEnded = timerPaused && secondsLeft === 0;

  return (
    <div className="App">
      <Head>
        <title>Scrum watch</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="App-header">
        Scrum Watch
        <input
          className="timer"
          value={timerStarted ? timeLabel() : timerInput}
          onChange={handleTimerInputChange}
        ></input>
        <div className="button-container">
          <button
            onClick={startTimer}
            disabled={(timerStarted && !timerPaused) || timerEnded}
          >
            {timerPaused ? "resume timer" : "start timer"}
          </button>
          <button
            id="stop-btn"
            onClick={stopTimer}
            disabled={!timerStarted && !timerPaused}
          >
            stop/reset timer
          </button>
          <button
            id="pause-btn"
            onClick={pauseTimer}
            disabled={!timerStarted || timerPaused}
          >
            pause timer
          </button>
        </div>
        <div className="App-footer">
          made by{" "}
          <a href="http://github.com/khaledaylii" target={"_blank"}>
            @khaledaylii
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
