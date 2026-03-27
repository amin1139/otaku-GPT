import { createBrowserRouter, RouterProvider, useNavigate } from "react-router"
import Login from "./component/Login"
import Body from "./component/Body"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "./utils/userSlice"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./utils/firebase"
import ErrorPage from "./component/ErrorPage"

const router = createBrowserRouter([
  { path: '/', element: <Login />, errorElement: <ErrorPage /> },
  { path: '/browser', element: <Body />, errorElement: <ErrorPage /> },
  { path: '/error', element: <ErrorPage /> }
])

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid:uid, email:email,  displayName: displayName, photoURL: photoURL}))
      } else {
        dispatch(removeUser())
      }
    });
  },[])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
