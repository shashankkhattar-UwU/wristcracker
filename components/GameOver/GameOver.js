import React from 'react'
import Link from 'next/link';
import styles from '../../styles/Home.module.css'

function GameOver({clicks, timeTaken, reset}) {
  return (
    <h1 className={styles.over}>
                Game over.... <br />
                Your accuracy is: {((10/clicks)*100).toFixed(2)} % <br />
                Time taken is: {timeTaken} <br />
                <span className={styles.restart} onClick={reset}>Restart</span> <br />
                <Link href='/'>Home</Link>
    </h1>
  )
}

export default GameOver