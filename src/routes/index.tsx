import { createBrowserRouter } from "react-router";
import App from "../App";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserManagement from "../components/user/UserManagement";
import Projects from "../pages/project/Projects";
import AdminProjects from "../pages/project/AdminProjects";
import InviteUser from "../pages/admin/InviteUser";
import ErrorPage from "../pages/ErrorPage";
import AdminRoute from "../pages/auth/AdminRoute";
import PrivateRoute from "../pages/auth/PrivateRoute";
import Banner from "../pages/Home/Banner";





export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    errorElement: <ErrorPage/>,
    children : [
    {
      Component: Banner,
      path: "/",
      index: true
    },
    {
      Component: Login,
      path: "/login"
    },
    {
      Component: Register,
      path: "/register"
    },
    {
      
      path:'/users',
      element: <AdminRoute><UserManagement/></AdminRoute>
    },
    {
    
      path:'/projects',
      element: <PrivateRoute><Projects/></PrivateRoute>
    },
    {
      
      path:'/projects-management',
        element: <AdminRoute><AdminProjects/></AdminRoute>
    },
    {
     
      path:'/invite',
        element: <AdminRoute><InviteUser/></AdminRoute>
    },
      



    ]
   
  },

]);