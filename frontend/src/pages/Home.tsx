export default function Home() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    window.location.href = "/login";
  };
  return <div onClick={handleLogout}>home</div>;
}
