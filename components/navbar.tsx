"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

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

      {user?.role === "provider" && (
        <button className="btn btn-primary">Provider Dashboard</button>
      )}

      <div className="navbar-end gap-5">
        {user ? (
          <>
            <p className="text-sm font-medium">{user.email}</p>
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
function setProfile(data: { role: any; } | null) {
  throw new Error("Function not implemented.");
}

