import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import PrivateRoute from "../components/PrivateRoute";
import DashboardPage from "../routes/DashboardPage";
import { useAuthStore } from "@/store/useAuthStore";
import Layout from "@/components/Layout";
import EditPostPage from "@/routes/EditPostPage";
import PostsPage from "@/routes/PostsPage";
import PublicPostPage from "@/routes/PublicPostPage";
import { RegisterForm } from "@/components/auth/RegisterForm";
import NotFoundPage from "@/routes/NotFoundPage";
import { LoginForm } from "@/components/auth/LoginForm";

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/edit" element={<EditPostPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PublicPostPage />} />
        </Route>
      </Route>

      {/* Catch-all Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
