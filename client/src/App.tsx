import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "./routes/router";
import { useEffect } from "react";
import useAuthStore from "./store/auth.store";

export default function App() {
  const router = createBrowserRouter(Routes);
  const { initialize, loading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}