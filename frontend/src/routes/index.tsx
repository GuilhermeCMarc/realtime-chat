import RegisterPage from "../pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import Root from "../pages/Root";
import ProtectedRoute from "./ProtectedRoute";
import ChatPage from "../pages/chat/ChatPage";
import SelectChatPage from "../pages/chat/SelectChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "/",
        element: <ProtectedRoute route={<ChatPage />} />,
        children: [
          {
            path: "/",
            element: <ProtectedRoute route={<SelectChatPage />} />,
          },
        ],
      },
    ],
  },
]);
