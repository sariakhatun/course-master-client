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
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Dashboard/DashboardLayout";
import MyCourses from "../Dashboard/StudentDashboard/MyCourses";
import DashboardHome from "../Dashboard/DashboardHome";
import Quiz from "../Dashboard/StudentDashboard/Quiz";
import Assignment from "../Dashboard/StudentDashboard/Assignment";
import CoursePlayer from "../Dashboard/StudentDashboard/CoursePlayer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element:<Home></Home>,
      },
      {
        path: "/courses",
        element:<Courses></Courses>,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails></CourseDetails>,
      },
      {
        path: "/courses/:id/player",
        element: <PrivateRoute>
          <CoursePlayer></CoursePlayer>
        </PrivateRoute>,
      },

      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/feedback",
        element: <FeedBack></FeedBack>,
      },
      {
        path: "/login",
        element:<Login></Login>,
      },
      {
        path: "/register",
       element: <Register></Register>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <DashboardHome />
              </PrivateRoute>
            ),
          },
          {
            path: "add-course",
            element: (
              <PrivateRoute>
                <AddCourse></AddCourse>
              </PrivateRoute>
            ),
          },

          {
            path: "my-courses",
            element: (
              <PrivateRoute>
                <MyCourses />
              </PrivateRoute>
            ),
          },
          {
            path: "assignment",
            element: (
              <PrivateRoute>
                <Assignment></Assignment>
              </PrivateRoute>
            ),
          },
          {
            path: "quiz",
            element: (
              <PrivateRoute>
                <Quiz></Quiz>
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);
