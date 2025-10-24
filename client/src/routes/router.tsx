import AuthLayout from "@/components/auth.layout";
import ProtectedRoute from "@/components/protected.layout";
import Home from "@/pages/home";
import Login from "@/pages/login/login";
import ProductPage from "@/pages/products/product-page";
import Products from "@/pages/products/products";
import Profile from "@/pages/profile/profile";
import Register from "@/pages/register/register";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import UserManager from "@/pages/admin/user-manager";

export const Routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/products",
        element: <Products />,
    },
    {
        path: "/products/:id",
        element: <ProductPage />,
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
            }
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
        element: <AdminDashboard />,
    },
    {
        path: "/admin/users",
        element: <UserManager />,
    }
]