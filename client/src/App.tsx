import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "./routes/router";
import { useEffect } from "react";
import useAuthStore from "./store/auth.store";
import Loading from "./components/ui/loading";

export default function App() {
  const router = createBrowserRouter(Routes);
  const { initialize, loading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return <RouterProvider router={router} />;
}