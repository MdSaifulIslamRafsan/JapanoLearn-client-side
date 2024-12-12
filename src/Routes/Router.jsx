import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../Layouts/Root";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/dashboard",
          element: <PrivateRoute><h1>Home Page</h1></PrivateRoute>,

        },
        {
          path: "/signup",
          element: <SignUp></SignUp>,
        },
        {
          path : "/login",
          element: <Login></Login>,
        }
      ]
    },
  ]);

export default router;