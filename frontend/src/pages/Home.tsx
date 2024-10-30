import { useCallback } from "react";
import Transition from "../components/common/Transition";

export default function Home() {
  const handleLogout = useCallback(() => {
    alert("Logged out successfully");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/login";
  }, []);

  return (
    <Transition>
      <div>
        <h1>Hello {localStorage.getItem("username")} !</h1>
        <p>Welcome to Task Manager</p>
        <p>Click on the sidebar to navigate</p>
        <p>Your role is {localStorage.getItem("role")}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Transition>
  );
}
