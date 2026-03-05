"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Fetch user session and profile
  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmount

    const initAuth = async () => {
      setLoading(true);

      // Get current user
      const { data } = await supabase.auth.getUser();
      const currentUser = data.user ?? null;
      if (!isMounted) return;

      setUser(currentUser);

      if (currentUser) {
        const { data: profileData, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", currentUser.id)
          .single();
        if (!isMounted) return;

        if (!error && profileData) setProfile(profileData);
      } else {
        setProfile(null);
      }

      // Artificial delay (optional)
      setTimeout(() => {
        if (isMounted) setLoading(false);
      }, 1000);
    };

    initAuth();

    // Listen for auth state changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted) return;

        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const { data: profileData, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", currentUser.id)
            .single();
          if (!isMounted) return;

          if (!error && profileData) setProfile(profileData);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.push("/Login");
  };

  // Navbar Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-24 bg-base-100">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-sm p-3 pl-10 pr-10 ">
      {/* Navbar start */}
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          Click2Book
        </Link>
      </div>

      {/* Navbar center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8 font-bold">
          <li><Link href="/">Home</Link></li>
          <li>
            <details open={categoriesOpen}>
              <summary onClick={(e) => { e.preventDefault(); setCategoriesOpen(!categoriesOpen); }}>
                Categories
              </summary>
              <ul className="p-2 w-52 bg-base-100 rounded-box shadow z-50">
                {["Health Care","Education","Beauty & Wellness","Home Services","Pet & Animals","Technology"].map((cat) => (
                  <li key={cat}>
                    <button
                      className="w-full text-left px-2 py-1 hover:bg-base-200 rounded"
                      onClick={() => {
                        router.push(`/ads?category=${encodeURIComponent(cat)}`);
                        setCategoriesOpen(false);
                      }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li><Link href="/HowItWorks">How It Works</Link></li>
          <li><Link href="/About">About</Link></li>
        </ul>
      </div>

      {/* Navbar end */}
      <div className="navbar-end gap-4 flex items-center">
        {user ? (
          <>
            {profile?.role === "provider" && (
              <button
                className="btn btn-primary"
                onClick={() => router.push("/ProviderDashbord")}
              >
                Provider Dashboard
              </button>
            )}
            <button
              className="btn bg-red-600 text-white"
              onClick={() => router.push("/ActivityCenter")}
            >
              Activity Center
            </button>
            <p className="text-sm font-medium">
              {profile?.first_name} {profile?.last_name}
            </p>
            <button
              onClick={handleLogout}
              className="btn btn-error text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/Login" className="btn">Login</Link>
            <Link href="/SignUp" className="btn bg-slate-600 text-white">SignUp</Link>
          </>
        )}
      </div>
    </div>
  );
}