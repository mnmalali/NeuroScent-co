import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "../types";
import { Menu, X } from "lucide-react";
import supabase from "../lib/supabaseClient";
import AuthModal from "./AuthModal";

const NAV_ITEMS: NavItem[] = [
  { label: "Products", path: "/products" },
  { label: "Scent Profiles", path: "/scent-profiles" },
  { label: "The Science", path: "/science" },
  { label: "The Machine", path: "/machine" },
  { label: "About", path: "/about" },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auth: load current user and listen for changes
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!mounted) return;
        setUser(data?.user ?? null);
        if (data?.user) {
          const { data: adminData } = await supabase
            .from("admins")
            .select("user_id")
            .eq("user_id", data.user.id)
            .maybeSingle();
          setIsAdmin(Boolean(adminData?.user_id));
        } else {
          setIsAdmin(false);
        }
      } catch (e) {
        console.warn("Auth init error", e);
      }
    };
    init();

    const res: any = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        supabase
          .from("admins")
          .select("user_id")
          .eq("user_id", u.id)
          .maybeSingle()
          .then(({ data }) => setIsAdmin(Boolean(data?.user_id)));
      } else {
        setIsAdmin(false);
      }
    });

    // supabase.auth.onAuthStateChange can return different shapes depending on client version.
    // Try to find the subscription object safely and unsubscribe on cleanup.
    const subscription = res?.data?.subscription ?? res?.subscription ?? null;

    return () => {
      mounted = false;
      try {
        subscription?.unsubscribe?.();
      } catch (e) {
        // swallow any errors during cleanup
        // (some older/newer SDK versions expose different APIs)
        // no-op
      }
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-neuro-black">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-neuro-ivory/90 backdrop-blur-md py-4 border-neuro-gold/20 shadow-sm"
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="z-50">
            <h1 className="font-serif text-2xl tracking-wider font-semibold">
              NEUROSCENT
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-xs uppercase tracking-[0.2em] hover:text-neuro-gold transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}

            {/* Auth area to the right of nav */}
            <div className="flex items-center space-x-4 ml-6">
              {user ? (
                <>
                  <span className="text-xs">{user.email ?? "Account"}</span>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-xs uppercase tracking-[0.2em] hover:text-neuro-gold"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                    }}
                    className="text-xs uppercase tracking-[0.2em] hover:text-neuro-gold"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthMode("sign-in");
                      setAuthOpen(true);
                    }}
                    className="text-xs uppercase tracking-[0.2em] hover:text-neuro-gold"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("sign-up");
                      setAuthOpen(true);
                    }}
                    className="text-xs uppercase tracking-[0.2em] hover:text-neuro-gold"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </nav>
          <AuthModal
            open={authOpen}
            mode={authMode}
            onClose={() => setAuthOpen(false)}
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Nav Overlay */}
          <div
            className={`fixed inset-0 bg-neuro-ivory z-40 flex flex-col items-center justify-center space-y-8 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-serif text-3xl hover:text-neuro-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/how-it-works"
              className="mt-8 text-xs uppercase tracking-widest border-b border-neuro-black pb-1"
            >
              How It Works
            </Link>
            <Link
              to="/faq"
              className="text-xs uppercase tracking-widest border-b border-neuro-black pb-1"
            >
              FAQ
            </Link>

            <div className="flex flex-col items-center space-y-6 pt-8 w-1/2">
              {user ? (
                <>
                  <span className="text-xs tracking-[0.2em] text-neuro-black/60 uppercase text-center w-full truncate px-4">
                    {user.email ?? "Account"}
                  </span>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs uppercase tracking-widest border-b border-neuro-black pb-1"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-xs uppercase tracking-widest border-b border-neuro-black pb-1"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthMode("sign-in");
                      setAuthOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-xs uppercase tracking-widest border-b border-neuro-black pb-1"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("sign-up");
                      setAuthOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-xs uppercase tracking-widest border-b border-neuro-black pb-1"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-neuro-black text-neuro-ivory pt-20 mt-20 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 relative z-10">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl tracking-wider">NEUROSCENT</h2>
            <p className="text-sm text-gray-400 font-light max-w-xs leading-relaxed">
              The intersection of artificial intelligence and high perfumery.
              Personalized scent, synthesized in real-time.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-neuro-gold mb-6">
              Discover
            </h3>
            <ul className="space-y-3 text-sm font-light text-gray-300">
              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition-colors"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/scent-profiles"
                  className="hover:text-white transition-colors"
                >
                  Scent Profiles
                </Link>
              </li>
              <li>
                <Link
                  to="/machine"
                  className="hover:text-white transition-colors"
                >
                  The Machine
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-neuro-gold mb-6">
              Learn
            </h3>
            <ul className="space-y-3 text-sm font-light text-gray-300">
              <li>
                <Link
                  to="/science"
                  className="hover:text-white transition-colors"
                >
                  The Science
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/future"
                  className="hover:text-white transition-colors"
                >
                  Future Vision
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-neuro-gold mb-6">
              Connect
            </h3>
            <ul className="space-y-3 text-sm font-light text-gray-300">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li className="pt-4 text-xs text-gray-500">
                © 2026 NeuroScent. All rights reserved.
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <img
            src="/images/hand%20of%20adam.png"
            alt="Hand of Adam"
            className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </footer>
    </div>
  );
};
