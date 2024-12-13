import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../Layouts/Root";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "../Layouts/Dashboard";
import AddLesson from "../Component/Dashboard/AddLesson";
import AddVocabulary from "../Component/Dashboard/AddVocabulary";
import ManageUser from "../Component/Dashboard/ManageUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <h1>Home Page</h1>
          </PrivateRoute>
        ),
      },

      {
        path: "/contact",
        element: (
          <AdminRoute>
            <h1>AdminRoute Page</h1>
          </AdminRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "/dashboard",
    element:<Dashboard></Dashboard>,
    children: [
      {
        path: "lessons",
        element: <h1>Home Page</h1>,
      },
      {
        path: "add-lessons",
        element: <AddLesson></AddLesson>,
      },
      {
        path: "add-vocabularies",
        element: <AddVocabulary></AddVocabulary>,
      },
      {
        path: "manage-users",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "lesson-management",
        element: <h1>Home Page</h1>,
      },
      {
        path: "vocabulary-management",
        element: <h1>Home Page</h1>,
      },
    ],
  },
]);

export default router;
