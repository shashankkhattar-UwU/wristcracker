import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import GameOver from "../components/GameOver/GameOver";
import BottomOptions from "../components/BottomOptions/BottomOptions";
import Circle from "../components/Circle/Circle";
import PlayButton from "../components/PlayButton/PlayButton";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import {signOut} from '../store/User/action'

function play() {
  const dispatch=useDispatch();
  const shouldCheck = useRef(true);
  const [update, setUpdate] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(10);
  const [clicks, setClicks] = useState(0);
  const [startTime, setstartTime] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const user=useSelector(state=>state.user.username);
  const jwt=useSelector(state=>state.user.jwt);

  useEffect(() => {
    if (counter === 0) {
      finished();
    }
  }, [counter]);


  useEffect(()=>{
    if(shouldCheck.current){
      shouldCheck.current=false;
      if (!(user&&jwt)) {
        alert("You must be signed in to play this game");
        Router.push('/');
      }
      
    }

  },[])

  const pointScored = () => {
    const newCount = counter - 1;
    setCounter(newCount);
    const newClicks = clicks + 1;
    setClicks(newClicks);
    setScore(score + 1);
  };
  const missed = () => {
    if (counter > 0 && playing) {
      setClicks(clicks + 1);
    }
  };
  const reset = () => {
    setCounter(10);
    setScore(0);
    setClicks(0);
    setPlaying(false);
  };
  const finished = async () => {
    const tempTimetaken = (Date.now() - startTime) / 1000;

    setTimeTaken(tempTimetaken);
    const result = {
      jwt: jwt,
      accuracy: ((10 / clicks) * 100).toFixed(2),
      time: tempTimetaken.toFixed(3),
    };
    const response = await axios.post(
      "http://localhost:3000/api/savescore",
      result
    );
    if(response.status!==200){
      alert("Something went wrong, Please sign in again");
      dispatch(signOut());
    }
    setUpdate(!update);
  };
  const startPlay = () => {
    setPlaying(true);
    setstartTime(Date.now());
  };
  return (
    <div className={styles.container}>
      <div className={styles.canvas} onClick={missed}>
        {!playing ? (
          <PlayButton start={startPlay}/>
        ) : (
          <>
            {counter !== 0 ? (
              <Circle score={pointScored} />
            ) : (
              <GameOver clicks={clicks} timeTaken={timeTaken} reset={reset} />
            )}
          </>
        )}
      </div>
      <BottomOptions playing={playing} reset={reset} counter={counter} />
      <Leaderboard updateVar={update}/>
    </div>
  );
}

export default play;
