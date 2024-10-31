import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/common/loading/Loading";
import { ToastProvider } from "./components/toast/ToastContext";
import Task from "./pages/Task";
import User from "./pages/User";

const Layout = lazy(() => import("./layouts/Layout"));
const Login = lazy(() => import("./pages/Login"));
const NoPermisson = lazy(() => import("./pages/nopermisson/NoPermisson"));
const NotFound = lazy(() => import("./pages/notfound/NotFound"));
const Home = lazy(() => import("./pages/Home"));

export default function App() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(savedTheme);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/task",
      element: (
        <Layout>
          <Task />
        </Layout>
      ),
    },
    {
      path: "/user",
      element: (
        <Layout>
          <User />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/no-permission",
      element: <NoPermisson />,
    },
  ]);

  return (
    <ToastProvider>
      <Suspense fallback={<Loading />}>
        {token ? <RouterProvider router={router}></RouterProvider> : <Login />}
      </Suspense>
    </ToastProvider>
  );
}
