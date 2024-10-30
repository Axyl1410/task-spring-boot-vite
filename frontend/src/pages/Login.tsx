import { useState } from "react";
import api from "../api/axiosConfig";
import { useToast } from "../components/toast/ToastContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useToast();

  const handleLogin = async () => {
    try {
      const response = await api.post("api/v1/auth/login", {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", response.data.role); // Store role
        window.location.href = "/";
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      addToast("Login failed", "error");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
