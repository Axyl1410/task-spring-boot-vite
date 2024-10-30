import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/common/loading/Loading";
import { ToastProvider } from "./components/toast/ToastContext";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";

const Home = lazy(() => import("./pages/Home"));

export default function App() {
  const token = localStorage.getItem("token");

  (function () {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(savedTheme);
  })();

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
      path: "/login",
      element: <Login />,
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
