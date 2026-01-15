import { Link, useLocation } from "react-router-dom";
import { User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ButtonfromWix";
import { useState, useRef } from "react";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopCollapsed, setShopCollapsed] = useState(true);
  const [desktopShopOpen, setDesktopShopOpen] = useState(false);
  const shopTimeoutRef = useRef<number | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const shopCategories = [
    { name: "All Products", slug: "all-products" },
    { name: "Rompers", slug: "rompers" },
    { name: "Bottoms", slug: "bottoms" },
    { name: "Tops", slug: "tops" },
    { name: "Dresses", slug: "dresses" },
    { name: "Seconds", slug: "seconds" },
  ];

  return (
    <div className="w-full">
      <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
        <div className="max-w-[120rem] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-3xl md:text-4xl font-heading text-primary">
                Tiny Threads
              </h1>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-base font-paragraph transition-colors ${
                  isActive("/")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                Home
              </Link>

              <div
                className="relative"
                onMouseEnter={() => {
                  if (shopTimeoutRef.current)
                    window.clearTimeout(shopTimeoutRef.current);
                  setDesktopShopOpen(true);
                }}
                onMouseLeave={() => {
                  shopTimeoutRef.current = window.setTimeout(
                    () => setDesktopShopOpen(false),
                    120
                  );
                }}
              >
                <button
                  onClick={() => setDesktopShopOpen((s) => !s)}
                  aria-expanded={desktopShopOpen}
                  className={`text-base font-paragraph transition-colors inline-flex items-center gap-2 ${
                    isActive("/store")
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  Shop
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${desktopShopOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {desktopShopOpen && (
                  <div className="absolute left-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-3 z-50">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/store/${cat.slug}`}
                        className="block text-sm text-foreground py-2 px-2 rounded hover:bg-gray-50"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <div className="border-t my-2" />
                    <Link
                      to="/store"
                      className="block text-sm text-foreground py-2 px-2 rounded hover:bg-gray-50"
                    >
                      View All
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className={`text-base font-paragraph transition-colors ${
                  isActive("/about")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className={`text-base font-paragraph transition-colors ${
                  isActive("/contact")
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/40"
            aria-hidden
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className="absolute top-0 left-0 w-80 max-w-full h-full bg-white shadow-xl p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <h2 className="text-2xl font-heading text-primary">
                  Tiny Threads
                </h2>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-paragraph ${isActive("/") ? "text-primary font-semibold" : "text-foreground"}`}
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => setShopCollapsed((s) => !s)}
                  aria-expanded={!shopCollapsed}
                  className="w-full flex items-center justify-between text-base font-paragraph text-foreground hover:text-primary"
                >
                  <span>Shop</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${shopCollapsed ? "" : "rotate-180"}`}
                  />
                </button>

                {!shopCollapsed && (
                  <div className="mt-2 ml-3 flex flex-col gap-2">
                    {shopCategories.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/store/${category.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-paragraph text-foreground hover:text-primary"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <Link
                      to="/store"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-paragraph text-foreground hover:text-primary mt-2"
                    >
                      View All
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-paragraph ${isActive("/about") ? "text-primary font-semibold" : "text-foreground"}`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-paragraph ${isActive("/contact") ? "text-primary font-semibold" : "text-foreground"}`}
              >
                Contact
              </Link>

              <div className="mt-4 border-t pt-4">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-paragraph text-foreground hover:text-primary"
                >
                  Login / Register
                </Link>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Header;
