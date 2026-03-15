import { createBrowserRouter, RouterProvider } from "react-router"
import Login from "./component/Login"
import Body from "./component/Body"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>
    },
    {
      path: '/browser',
      element: <Body/>
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
