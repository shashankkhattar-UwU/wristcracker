import React from 'react'
import styles from '../../styles/Home.module.css'
import Image from 'next/dist/client/image'
// import play from '../../public/play.png'

function PlayButton({start}) {
  return (
    <div className={`${styles.buttons} ${styles.playbutton}`} onClick={start}>
        <Image src="/play.svg" alt="Play" width={'100px'} height={'100px'} />
    </div>
  )
}

export default PlayButton