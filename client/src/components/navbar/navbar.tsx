import { Link, useLocation } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import { useState, useEffect } from "react";
import { User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) => `
    px-4 py-2  font-medium transition-all duration-200
    ${
      isActive(path)
        ? "text-[#FFA081]"
        : "text-black/80 hover:bg-black/10 hover:text-black"
    }
  `;

  const isAdmin = user?.role === "admin" || user?.role === "super_admin";

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? "backdrop-blur-md bg-white/80 shadow-lg" : "bg-white"
    }`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/Logo.png" alt="logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/about" className={navLinkClass("/about")}>
              About
            </Link>
            <Link to="/blog" className={navLinkClass("/blog")}>
              Blog
            </Link>
            <Link to="/shop" className={navLinkClass("/shop")}>
              Shop
            </Link>
            <Link to="/features" className={navLinkClass("/features")}>
              Features
            </Link>
            <Link to="/contacts" className={navLinkClass("/contacts")}>
              Contacts
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <User2 />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>
                    <div className="ml-4 flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200">
                        <div className="w-8 h-8 bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-bold text-white">
                          {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {user?.username}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuGroup className="flex flex-col gap-2 py-2">
                    <Link
                      to="/profile"
                      className={`${navLinkClass(
                        "/profile"
                      )} outline-none ring-0 focus:ring-0 focus-visible:ring-0`}
                    >
                      Profile
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        className={`${navLinkClass(
                          "/admin/dashboard"
                        )} outline-none ring-0 focus:ring-0 focus-visible:ring-0`}
                      >
                        Admin
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="px-4 py-2 bg-red-600 text-white border border-red-700 font-medium hover:bg-red-700 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="ml-4 flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="px-4 py-2  hover:text-[#FFA081] font-medium transition-colors duration-150"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-2 hover:text-[#FFA081] font-medium transition-colors duration-150 "
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              <Link to="/" className={navLinkClass("/")}>
                Home
              </Link>
              <Link to="/products" className={navLinkClass("/products")}>
                Products
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className={navLinkClass("/profile")}>
                    Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className={navLinkClass("/admin/dashboard")}
                    >
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 mt-2">
                    <div className="w-8 h-8 bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm font-bold text-white">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {user?.username}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600 text-white border border-red-700 font-medium hover:bg-red-700 transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className={navLinkClass("/auth/login")}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="px-4 py-2 bg-gray-900 text-white font-medium hover:bg-gray-700 transition-all text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
