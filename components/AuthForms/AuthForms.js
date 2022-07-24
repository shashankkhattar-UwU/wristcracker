import React, { useState, window } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import styles from '../../styles/Home.module.css';
import { signIn } from "../../store/User/action";

function AuthForms() {
  const dispatch=useDispatch();
  const jwt=useSelector(state=>state.user.jwt);
  const [taken, setTaken] = useState(false)
  // const [match, setMatch] = useState(true)
  const [reg, setReg] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // window.localStorage.setItem("jwt", "sample");
  const handleChange=async(e)=>{
    if(e.target.name==='username'){
      const newUsername=e.target.value
      if(newUsername.includes(' '))
        return;
      setUsername(newUsername);
      if(newUsername){
        const response=await axios.post('http://localhost:3000/api/auth/checkusername', {username: newUsername});
        setTaken(response.data.isTaken);
      }
    }
    else if(e.target.name==='password'){
      setPassword(e.target.value);
    }
    else if(e.target.name==='password2'){
      setPassword2(e.target.value);
      // if(password&&password2){
      //   setMatch(password===password2);
      //   console.log(`matching is ${match}`);
      // }
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const user={
      username: username,
      password: password
    }
    if(reg){
      if(taken){
        alert("This username is taken");
        return
      }
      else if(password!==password2){
        alert("The passwords do not match");
        return;
      }
    }
    try{
      const response=await axios.post(`http://localhost:3000/api/auth/${reg?"signup":"signin"}`, user);
      if (response.status===200) {
        const player=response.data.player;
        dispatch(signIn({username: player.username, jwt: player.jwt}));
      }
      else{
        alert("Authentication failed, Please try again");
      }
    }
    catch(e){
      alert(e.response.data.error);
    }
    // console.log(response);

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input required={true} onChange={handleChange} type="text" value={username} name="username" id="usernameField" /><br />{reg&&<span className={`${taken&&styles.errormsg} ${styles.fieldside}`}>{taken?"This username is taken":(username&&`This username is available`)}</span>}  <br />
        <label htmlFor="password">Password</label>
        <input required={true} onChange={handleChange} value={password} type="password" name="password" id="passwordField" /> <br />
        {reg && (
          <>
            <label htmlFor="password">Re-Enter Password</label>
            <input required={reg?true:false} onChange={handleChange} type="password" name="password2" id="passwordField2" /> <br /> <span className={`${(!(password===password2))&&styles.errormsg} ${styles.fieldside}`}>{password===password2?"":(password2&&`Passwords do not match`)}</span> <br />
          </>
        )}
        <button disabled={(reg&&(taken||(password!==password2)))} type="submit">{reg?"Sign Up":"Log in"}</button> <u><p className={styles.buttons} onClick={()=>{setReg(!reg)}}>{reg?"Already registered":"Register"}</p></u>
      </form>
    </div>
  );
}

export default AuthForms;
