import { createBrowserRouter } from "react-router";
import App from "../App";



// import DashboardLayout from "../components/layout/DashboardLayout";
// import { generateRoutes } from "../utils/generateRoutes";
// import { userSidebarItems } from "./userSidebarItems";
// import { withAuth } from "../utils/withAuth";
// import { role } from "../constants/role";
// import { adminSidebarItems } from "./adminSidebarItems";
// import { agentSidebarItems } from "./agentSidebarItems";
// import { lazy } from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserManagement from "../components/user/UserManagement";
import Projects from "../pages/project/Projects";


// const Register = lazy(() => import("../pages/Register"));

// const Unauthorized = lazy(() => import("../utils/Unauthorized"));
// const Home = lazy(() => import("../pages/Home"));
// const About = lazy(() => import("../pages/About"));
// const Features = lazy(() => import("../pages/Features"));
// const Contact = lazy(() => import("../pages/Contact"));
// const FAQ = lazy(() => import("../pages/FAQ"));
// const ErrorPage = lazy(() => import("../components/layout/ErrorPage"));


export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    // errorElement: <ErrorPage/>,
    children : [
    {
      Component: Login,
      path: "/login"
    },
    {
      Component: Register,
      path: "/register"
    },
    {
      Component : UserManagement,
      path:'/users'
    },
    {
      Component: Projects,
      path:'/projects'
    },
    // {
    //   Component: About,
    //   path:'/about'
    // },
    // {
    //   Component: Features,
    //   path:'/features'
    // },
    // {
    //   Component: Contact,
    //   path:'/contact'
    // },
    // {
    //   Component: FAQ,
    //   path:'/faq'
    // }
      
        



    ]
   
  },

//    {
//     path: "/user",
//     Component: withAuth(() => <DashboardLayout role={role.user} />, role.user),
//     errorElement:<ErrorPage/>,
//     children: [
//       { index: true, element: <Navigate to="/user/dashboard" /> },
//       ...generateRoutes(userSidebarItems),
//     ],
//   },
//    {
//     path: "/admin",
//     Component: withAuth(() => <DashboardLayout role={role.admin} />, role.admin),
//     errorElement:<ErrorPage/>,
//     children: [
//       { index: true, element: <Navigate to="/admin/dashboard" /> },
//       ...generateRoutes(adminSidebarItems),
//     ],
//   },
//    {
//     path: "/agent",
//     Component: withAuth(() => <DashboardLayout role={role.agent} />, role.agent),
//     errorElement:<ErrorPage/>,
//     children: [
//       { index: true, element: <Navigate to="/agent/dashboard" /> },
//       ...generateRoutes(agentSidebarItems),
//     ],
//   },
]);