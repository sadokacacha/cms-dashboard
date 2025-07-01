import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function index() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">hello</h1>

      </div>
      {/* Dashboard content */}
    </div>
  );
}
