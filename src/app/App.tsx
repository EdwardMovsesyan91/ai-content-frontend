import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import PrivateRoute from "../components/PrivateRoute";
import RegisterPage from "../routes/RegisterPage";
import LoginPage from "../routes/LoginPage";
import DashboardPage from "../routes/DashboardPage";
import { useAuthStore } from "@/store/useAuthStore";
import Layout from "@/components/Layout";
import EditPostPage from "@/routes/EditPostPage";
import PostsPage from "@/routes/PostsPage";
import PublicPostPage from "@/routes/PublicPostPage";

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/edit" element={<EditPostPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PublicPostPage />} />
        </Route>
      </Route>
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
