import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Auth/Login/Login";
import SignUp from "../Pages/Auth/Signup/Signup";
import ForgotPassword from "../Pages/Auth/Forgot-Password/ForgotPassword";
import ResetPassword from "../Pages/Auth/Reset-Password/ResetPassword";
import WelcomeLayout from "../Layout/WelcomeLayout";
import Welcome from "../Pages/Welcome/Welcome";
import Home from "../Pages/Home/Home/Home";
import ProfessionChoice from "../Pages/ProfessionChoice/ProfessionChoice";

import Message from "../Pages/Message/Message";
import ProfileUser from "../Pages/Profile/ProfileUser";
import ProfileFilter from "../Pages/Profile/ProfileFilter";
import Users from "../Pages/Users/Users";
import Community from "../Pages/Community/Community";
import Feedback from "../Pages/Community/Feedback";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

import PageNotFound from "../Pages/404/PageNotFound";
import CommunityInfo from "../Pages/Community/CommunityInfo";
import MyCommunitySingle from "../Pages/Community/MyCommunitySingle/MyCommunitySingle";

import CreateCommunity from "../Pages/Community/CreateCommunity";
import AuthProvider from "../Context/AuthProvider";
import Setting from "../Pages/Community/MyCommunitySingle/Setting";
import UserSetting from "../Pages/Profile/UserSetting/UserSetting";

const router = createBrowserRouter([
  {
    path: "/main",
    element: (
      <AuthProvider>
        <PrivateRoute>
          <Main></Main>
        </PrivateRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: "/main",
        element: <Home></Home>,
      },
      {
        path: "/main/professionchoice/:id",
        element: <ProfessionChoice></ProfessionChoice>,
      },
      {
        path: "/main/message",
        element: <Message></Message>,
      },
      {
        path: "/main/profileuser",
        element: <ProfileUser></ProfileUser>,
      },
      {
        path: "/main/profileuser/:id",
        element: <Users></Users>,
      },
      {
        path: "/main/profilefilter",
        element: <ProfileFilter></ProfileFilter>,
      },

      {
        path: "/main/community",
        element: <Community></Community>,
      },
      {
        path: "/main/community/:id",
        element: <CommunityInfo></CommunityInfo>,
      },
      {
        path: "/main/createcommunity",
        element: <CreateCommunity></CreateCommunity>,
      },
      {
        path: "/main/feedback",
        element: <Feedback></Feedback>,
      },

      {
        path: "/main/setting/:id",
        element: <Setting></Setting>,
      },
      {
        path: "/main/usersetting",
        element: <UserSetting></UserSetting>,
      },
      {
        path: "*",
        element: <PageNotFound></PageNotFound>,
      },
    ],
  },

  {
    path: "/",
    element: (
      <AuthProvider>
        <WelcomeLayout></WelcomeLayout>
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Welcome></Welcome>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword></ResetPassword>,
      },
    ],
  },
]);

export default router;
