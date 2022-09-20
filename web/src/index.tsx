import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pomodoro } from "./components/pomodoro/Pomodoro";
import Home from "./routes/Home";
import ErrorPage from "./routes/Error";
import Todo from "./components/todo/Todo";

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
        element: <Todo />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
