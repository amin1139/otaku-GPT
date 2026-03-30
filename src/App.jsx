import { createBrowserRouter, RouterProvider, useNavigate } from "react-router"
import Login from "./component/Login"
import Body from "./component/Body"
import ErrorPage from "./component/ErrorPage"
import AuthListener from "./component/AuthListener";

function App() {

  const router = createBrowserRouter([
  {
    element: <AuthListener />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/browse", element: <Body /> },
      { path: "/error", element: <ErrorPage /> },
    ],
  },
]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
