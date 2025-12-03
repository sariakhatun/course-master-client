import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import RootLayout from "../layouts/RootLayout";
import Courses from "../pages/Courses/Courses";
import Blogs from "../pages/Blogs/Blogs";
import FeedBack from "../pages/FeedBack/FeedBack";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ErrorPage from "../components/ErrorPage";
import CourseDetails from "../pages/Courses/CourseDetails";
import PrivateRoute from "../Routes/PrivateRoute";
import AddCourse from "../Dashboard/AdminDashboard/AddCourse";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/courses",
        Component: Courses,
      },
      {
        path: "/courses/:id",
        Component: CourseDetails,
      },
      {
        path: "/add-course",
        element: <PrivateRoute>
            <AddCourse></AddCourse>
        </PrivateRoute>
      },

      {
        path: "/blogs",
        Component: Blogs,
      },
      {
        path: "/feedback",
        Component: FeedBack,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);
