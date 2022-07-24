import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import AuthForms from "../components/AuthForms/AuthForms";
import { signOut } from "../store/User/action";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username);
  const jwt = useSelector((state) => state.user.jwt);

  const handleLogout=()=>{
    dispatch(signOut());
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Wrist Cracker Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        {user && jwt ? (
          <>
            welcome {user} <br />
            <Link href="/Play">Play</Link> <br />
            <span className={styles.buttons} onClick={handleLogout}>Logout</span>
          </>
        ) : (
          <>
            <AuthForms />
          </>
        )}
        <Leaderboard updateVar={true} />
      </h1>
    </div>
  );
}
