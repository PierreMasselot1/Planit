import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pomodoro } from "./routes/Pomodoro/Pomodoro";
import Home from "./routes/Home";
import ErrorPage from "./routes/Error";
import TodoListComponent from "./routes/Todo/Todo";
import { Auth0Provider } from "@auth0/auth0-react";
import Habit from "./routes/Habit/Habit";

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
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Auth0Provider
    audience="planit-auth"
    domain="dev-hfnpcabx1n3viyfj.us.auth0.com"
    clientId="WAOa9Dt62cQtYmvlDdclW4coP9fW5Iup"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <div className="font-mono">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  </Auth0Provider>
);
