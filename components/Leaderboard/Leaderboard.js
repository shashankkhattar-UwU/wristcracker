import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Leaderboard({updateVar}) {
  const playerName=useSelector(state=>state.user.username);
  const [scores, setScores] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get("http://localhost:3000/api/leaderboard");
      data = data.data.scores;
      setScores(data);
    };
    getData();
  }, [updateVar]);

  return (
    <div>
      <h2>LeaderBoard</h2>
      {scores.length && (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Accuracy</th>
              <th>Time Taken</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, i) => (
              <tr key={i}>
                <td>{`${score.playerName} ${score.playerName===playerName?"(You)":""}`}</td>
                <td>{score.accuracy}%</td>
                <td>{score.time}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
