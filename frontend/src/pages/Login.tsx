import { useState } from "react";
import api from "../api/axiosConfig";
import Transition from "../components/common/Transition";
import { useToast } from "../components/ui/ToastContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useToast();

  if (localStorage.getItem("token")) {
    window.location.href = "/";
  }

  const handleLogin = async () => {
    try {
      const response = await api.post("api/v1/auth/login", {
        username,
        password,
      });
      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        window.location.href = "/";
      } else {
        addToast("Login failed", "error");
      }
    } catch {
      addToast("Login failed", "error");
    }
  };

  return (
    <Transition>
      <div className="mx-5 flex h-screen flex-col items-center justify-center space-y-10 dark:bg-dark_primaty dark:text-white md:mx-0 md:my-0 md:flex-row md:space-x-16 md:space-y-0">
        <div className="max-w-sm md:w-1/3">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image"
          />
        </div>
        <div className="max-w-sm md:w-1/3">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-blue-600 md:text-3xl">
            Login
          </h2>

          <input
            className="w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm dark:bg-dark_primaty"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            className="mt-4 w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm dark:bg-dark_primaty"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <div className="mt-4 flex gap-4 text-center md:text-left">
            <button
              className="rounded bg-blue-600 px-4 py-2 text-xs uppercase tracking-wider text-white hover:bg-blue-700"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Login;
