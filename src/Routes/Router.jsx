import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../Layouts/Root";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <PrivateRoute><h1>Home Page</h1></PrivateRoute>,

        },
        {
          path: "/dashboard",
          element: <PrivateRoute><h1>AdminRoute Page</h1></PrivateRoute>,

        },
        {
          path: "/contact",
          element: <AdminRoute><h1>AdminRoute Page</h1></AdminRoute>,

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