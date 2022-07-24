import React from 'react'
import Link from 'next/link';
import styles from '../../styles/Home.module.css'

function BottomOptions({playing, counter, reset}) {
  return (
    <div className={styles.bottomoptions}>
        {playing?<>remaining: {counter} <br /><div className={styles.buttons} onClick={reset}>Stop playing</div><br /></>:<><Link href='/'>Home</Link></>}
    </div>
  )
}

export default BottomOptions