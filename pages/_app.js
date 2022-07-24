import '../styles/globals.css'
import { wrapper } from '../store/store'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/User/action';

function MyApp({ Component, pageProps }) {
  const dispatch=useDispatch();
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("user"))){
      dispatch(signIn(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
