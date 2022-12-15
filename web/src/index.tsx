import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pomodoro } from "./components/pomodoro/Pomodoro";
import Home from "./routes/Home";
import ErrorPage from "./routes/Error";
import TodoList from "./components/Todo/Todo";
import { Auth0Provider } from "@auth0/auth0-react";

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
        element: <TodoList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Auth0Provider
    domain="dev-hfnpcabx1n3viyfj.us.auth0.com"
    clientId="WAOa9Dt62cQtYmvlDdclW4coP9fW5Iup"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Auth0Provider>
);
