import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/common/loading/Loading";
import ScrollToTop from "./components/common/ScrollToTop";
import { ToastProvider } from "./components/toast/ToastContext";
import Layout from "./layouts/Layout";

const DetailTask = lazy(() => import("./pages/DetailTask"));
const MyTask = lazy(() => import("./pages/MyTask"));
const Task = lazy(() => import("./pages/Task"));
const User = lazy(() => import("./pages/User"));
const Login = lazy(() => import("./pages/Login"));
const NoPermisson = lazy(() => import("./pages/nopermisson/NoPermisson"));
const NotFound = lazy(() => import("./pages/notfound/NotFound"));
const Home = lazy(() => import("./pages/Home"));

export default function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(savedTheme);
  }, []);

  return (
    <ToastProvider>
      <Suspense fallback={<Loading />}>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/task"
            element={
              <Layout>
                <Task />
              </Layout>
            }
          />
          <Route
            path="/task/:id"
            element={
              <Layout>
                <DetailTask />
              </Layout>
            }
          />
          <Route
            path="/mytask"
            element={
              <Layout>
                <MyTask />
              </Layout>
            }
          />
          <Route
            path="/user"
            element={
              <Layout>
                <User />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/nopermisson" element={<NoPermisson />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ToastProvider>
  );
}
