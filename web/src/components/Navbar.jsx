import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <h1 className="text-xl font-bold text-gray-800">CMS Dashboard</h1>

        {["dashboard", "articles", "products", "seo"].map((route) => (
          <NavLink
            key={route}
            to={`/dashboard/${route === "dashboard" ? "" : route}`}
            className={({ isActive }) =>
              `text-sm ${
                isActive ? "font-bold text-blue-600" : "text-gray-600"
              }`
            }
          >
            {route.charAt(0).toUpperCase() + route.slice(1)}
          </NavLink>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        {user?.email && (
          <span className="text-sm text-gray-600">Hello, {user.email}</span>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
