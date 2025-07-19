import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <h1 className="text-xl font-bold text-gray-800">CMS Dashboard</h1>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-sm ${isActive ? "font-bold text-blue-600" : "text-gray-600"}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard/articles"
          className={({ isActive }) =>
            `text-sm ${isActive ? "font-bold text-blue-600" : "text-gray-600"}`
          }
        >
          Articles
        </NavLink>



        <NavLink
  to="/dashboard/products"
  className={({ isActive }) =>
    `text-sm ${isActive ? "font-bold text-blue-600" : "text-gray-600"}`
  }
>
  Products
</NavLink>

        <NavLink
          to="/dashboard/seo"
          className={({ isActive }) =>
            `text-sm ${isActive ? "font-bold text-blue-600" : "text-gray-600"}`
          }
        >
          SEO
        </NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Log Out
      </button>
    </nav>
  );
}
