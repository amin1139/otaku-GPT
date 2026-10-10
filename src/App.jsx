import { createBrowserRouter, RouterProvider, useNavigate } from "react-router";
import Login from "./component/Login";
import Body from "./component/Body";
import ErrorPage from "./component/ErrorPage";
import AuthListener from "./component/AuthListener";
import ExploreAll from "./component/ExploreAll";
import Browse from "./component/Browse";
import { lazy, Suspense } from "react";
const FindGpt = lazy(() => import("./component/FindGpt"));

function App() {
  const router = createBrowserRouter([
    {
      element: <AuthListener />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Login /> },
        {
          path: "/browse",
          element: <Body />,
          children: [
            {
              index: true,
              element: <Browse />,
            },
            {
              path: "explore",
              element: <ExploreAll />,
            },
            {
              path: "find",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <FindGpt />
                </Suspense>
              ),
            },
          ],
        },
        { path: "/error", element: <ErrorPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
