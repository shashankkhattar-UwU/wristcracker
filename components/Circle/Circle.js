import React, {useState} from 'react'
import styles from '../../styles/Home.module.css'

function Circle({score}) {
    const [x, setX]=useState(Math.floor(Math.random()*100));
    const [y, setY]=useState(Math.floor(Math.random()*100));

    const changeCoords=()=>{
      setX(Math.floor(Math.random()*100));
      setY(Math.floor(Math.random()*100));
    }
  return (
    <div className={styles.circle} onClick={()=>{score(); changeCoords();}} style={{top: `${y}%`, left: `${x}%`}}/>
  )
}

export default Circle