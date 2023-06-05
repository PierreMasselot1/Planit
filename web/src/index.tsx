import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pomodoro } from "./routes/Pomodoro/Pomodoro";
import Home from "./routes/Home";
import ErrorPage from "./routes/Error";
import TodoListComponent from "./routes/Todo/Todo";
import Habit from "./routes/Habit/Habit";
import Profile from "./routes/Profile/Profile";
import Dailies from "./routes/Dailies/Dailies";
import Login from "./routes/Auth/Login";
import Signup from "./routes/Auth/Signup";
import { User } from "@auth0/auth0-react";
import { UserProvider } from "./components/Auth/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/pomodoro",
        element: <Pomodoro />,
      },
      {
        path: "/todo",
        element: <TodoListComponent />,
      },
      {
        path: "/habit",
        element: <Habit />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/dailies",
        element: <Dailies />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserProvider>
    <React.StrictMode>
      <div className="font-mono">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  </UserProvider>
);
