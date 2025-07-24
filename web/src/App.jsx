import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Dashboard/auth/Login";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";

import Articles from "./pages/Dashboard/Articles/index";
import NewArticle from "./pages/Dashboard/Articles/NewArticle";
import EditArticle from "./pages/Dashboard/Articles/EditArticle";

import Products from "./pages/Dashboard/Products"; 
import NewProduct from "./pages/Dashboard/Products/NewProduct"; 
import EditProduct from "./pages/Dashboard/Products/EditProduct"; 


import ForgotPassword from "./pages/Dashboard/auth/ForgotPassword";
import ResetPassword from "./pages/Dashboard/auth/ResetPassword";




import SeoManager from "./pages/Dashboard/SeoManager";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          {/* Protected dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/new" element={<NewArticle />} />
            <Route path="articles/edit/:id" element={<EditArticle />} />

            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<NewProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="seo" element={<SeoManager />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
