"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProviderDashboard from "@/app/(withNavbar)/ProviderDashbord/page";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null); // Auth user
  const [profile, setProfile] = useState<any>(null); // Data from users table

  useEffect(() => {
    // Get initial session
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user);
      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

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
            <details>
              <summary>Categories</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
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
        <button className="btn btn-primary" onClick={() => router.push("/ProviderDashbord")}>Provider Dashboard</button>
      )}

      <div className="navbar-end gap-10">
        {user ? (
          <>
            <button className="btn bg-red-600 text-white" onClick={() => router.push("/ActivityCenter")}>Activity Center</button>
            <p className="text-sm font-medium">{profile?.first_name + " " + profile?.last_name}</p>
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
