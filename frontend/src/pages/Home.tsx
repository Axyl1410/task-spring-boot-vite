import Transition from "../components/common/Transition";

export default function Home() {
  return (
    <Transition>
      <div>
        <h1>Hello {localStorage.getItem("username")} !</h1>
        <p>Welcome to Task Manager</p>
        <p>Click on the sidebar to navigate</p>
        <p>Your role is {localStorage.getItem("role")}</p>
      </div>
    </Transition>
  );
}
