import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Root from "../Layouts/Root";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import VocabularyManagement from "../pages/Dashboard/VocabularyManagement";
import LessonManagement from "../pages/Dashboard/LessonManagement";
import AddVocabulary from "../pages/Dashboard/AddVocabulary";
import AddLesson from "../pages/Dashboard/AddLesson";
import ManageUser from "../pages/Dashboard/ManageUser";
import Dashboard from "../Layouts/Dashboard";
import LessonComponent from './../pages/Lesson';
import LessonDetailsPage from './../Component/LessonDetailsPage';
import TutorialPage from "../pages/Tutorials";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/lessons",
        element: (
          <PrivateRoute>
            <LessonComponent></LessonComponent>
          </PrivateRoute>
        ),
      },
      {
        path: "/lesson/:id",
        element: (
          <PrivateRoute>
            <LessonDetailsPage></LessonDetailsPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/tutorials",
        element: (
          <PrivateRoute>
            <TutorialPage></TutorialPage>
          </PrivateRoute>
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
    element: (
      <AdminRoute>
        <Dashboard></Dashboard>
      </AdminRoute>
    ),
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
        element: <LessonManagement></LessonManagement>,
      },
      {
        path: "vocabulary-management",
        element: <VocabularyManagement></VocabularyManagement>,
      },
    ],
  },
]);

export default router;
