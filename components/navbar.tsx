"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    // 1. Get initial session
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser(); // ✅ get user directly
      const currentUser = data.user ?? null;
      setUser(currentUser);
      if (currentUser) await fetchUserProfile(currentUser.id);
    };
    fetchUser();

    // 2. Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) await fetchUserProfile(currentUser.id);
        else setProfile(null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []); // ⬅️ remove [pathname], just run once on mount

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
    } else {
      setProfile(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.push("/Login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm p-3 pl-10 pr-10">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          Click2Book
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-10 font-bold">
          <li>
            <Link href="/">Home</Link>
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

          <li>
            <Link href="/HowItWorks">How It Works</Link>
          </li>

          <li>
            <Link href="/About">About</Link>
          </li>
        </ul>
      </div>

      {profile?.role === "provider" && (
        <button
          className="btn btn-primary"
          onClick={() => router.push("/ProviderDashbord")}
        >
          Provider Dashboard
        </button>
      )}

      <div className="navbar-end gap-10">
        {user ? (
          <>
            <button
              className="btn bg-red-600 text-white"
              onClick={() => router.push("/ActivityCenter")}
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
            <Link href="/Login" className="btn">
              Login
            </Link>

            <Link href="/SignUp" className="btn bg-slate-600 text-white">
              SignUp
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
