import AuthLayout from "@/components/layouts/auth.layout";
import ProtectedRoute from "@/components/layouts/protected.layout";
import Home from "@/pages/home";
import Login from "@/pages/login/login";
import ProductPage from "@/pages/products/product-page";
import Products from "@/pages/products/products";
import Profile from "@/pages/profile/profile";
import Register from "@/pages/register/register";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import UserManager from "@/pages/admin/user-manager";
import MainLayout from "@/components/layouts/main.layout";
import About from "@/pages/about/about";
import Blog from "@/pages/blog/blog";
import Features from "@/pages/features/fetures";
import Contacts from "@/pages/contacts/contacts";

export const Routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Products />,
      },
      {
        path: "/shop/:id",
        element: <ProductPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
    ],
  },
  
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute requiredRoles={["admin", "super_admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute requiredRoles={["admin", "super_admin"]}>
        <UserManager />
      </ProtectedRoute>
    ),
  },
];
