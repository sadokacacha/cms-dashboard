import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
