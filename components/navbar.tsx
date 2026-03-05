"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Utility to get current session
const getCurrentSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
};

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Fetch session and profile on mount
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const currentUser = await getCurrentSession();
      if (!isMounted) return;

      setUser(currentUser);
      if (currentUser) await fetchUserProfile(currentUser.id);
      else setProfile(null);

      setLoading(false);
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted) return;
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) await fetchUserProfile(currentUser.id);
        else setProfile(null);
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from DB
  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) console.error("Error fetching profile:", error);
    else setProfile(data);
  };

  // Centralized navigation with session check
  const handleNavigation = async (path: string) => {
    const currentUser = await getCurrentSession();
    if (!currentUser) {
      alert("Session expired. Please login again.");
      router.push("/Login");
      return;
    }
    router.push(path);
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.push("/Login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24 bg-base-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-sm p-3 pl-10 pr-10">
      {/* Navbar Start */}
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          Click2Book
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-10 font-bold">
          <li>
            <button onClick={() => handleNavigation("/")} className="btn btn-ghost">
              Home
            </button>
          </li>
          <li>
            <details open={categoriesOpen}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setCategoriesOpen((prev) => !prev);
                }}
              >
                Categories
              </summary>
              <ul className="p-2 w-52 bg-base-100 rounded-box shadow z-50">
                {[
                  "Health Care",
                  "Education",
                  "Beauty & Wellness",
                  "Home Services",
                  "Pet & Animals",
                  "Technology",
                ].map((cat) => (
                  <li key={cat}>
                    <button
                      className="w-full text-left px-2 py-1 hover:bg-base-200 rounded"
                      onClick={() =>
                        handleNavigation(`/ads?category=${encodeURIComponent(cat)}`)
                      }
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <button onClick={() => handleNavigation("/HowItWorks")} className="btn btn-ghost">
              How It Works
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("/About")} className="btn btn-ghost">
              About
            </button>
          </li>
        </ul>
      </div>

      {/* Provider Dashboard */}
      {profile?.role === "provider" && (
        <button
          className="btn btn-primary ml-4"
          onClick={() => handleNavigation("/ProviderDashbord")}
        >
          Provider Dashboard
        </button>
      )}

      {/* Navbar End */}
      <div className="navbar-end gap-4 flex items-center">
        {user ? (
          <>
            <button
              className="btn bg-red-600 text-white"
              onClick={() => handleNavigation("/ActivityCenter")}
            >
              Activity Center
            </button>
            <p className="text-sm font-medium">
              {profile?.first_name} {profile?.last_name}
            </p>
            <button onClick={handleLogout} className="btn btn-error text-white">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleNavigation("/Login")} className="btn">
              Login
            </button>
            <button
              onClick={() => handleNavigation("/SignUp")}
              className="btn bg-slate-600 text-white"
            >
              SignUp
            </button>
          </>
        )}
      </div>
    </div>
  );
}