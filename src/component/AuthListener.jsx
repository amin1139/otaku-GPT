import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice"
import { Outlet, useLocation, useNavigate } from "react-router";

const AuthListener = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid:uid, email:email,  displayName: displayName, photoURL: photoURL}))
        if (location.pathname === '/' || location.pathname === '/login') {
          navigate('/browse');
        }
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    });
    return () => unsubscribe();
  }, []);

  return <Outlet/>;
};

export default AuthListener;