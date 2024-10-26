import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/common/loading/Loading";
import { ToastProvider } from "./components/toast/ToastContext";

const Home = lazy(() => import("./pages/Home"));

export default function App() {
  (function () {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(savedTheme);
  })();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <ToastProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </ToastProvider>
  );
}
