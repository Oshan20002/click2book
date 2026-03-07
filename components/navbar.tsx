"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, profile, loading, signOut } = useAuth();

  return (
    <nav className="navbar bg-base-100 border-b px-6">
      
      {/* Brand */}
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">
          Click2Book
        </Link>
      </div>

      {/* Auth Section */}
      <div className="flex-none flex items-center gap-3">

        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : user ? (
          <>
            <span className="text-sm font-medium hidden sm:inline">
              {profile
                ? `${profile.first_name} ${profile.last_name}`
                : user.email}
            </span>

            {/* Provider dashboard */}
            {profile?.role === "provider" && (
              <Link
                href="/ProviderDashbord"
                className="btn btn-ghost btn-sm"
              >
                Provider Dashboard
              </Link>
            )}

            <Link href="/ActivityCenter" className="btn btn-ghost btn-sm">
              Activity Center
            </Link>

            <button className="btn btn-neutral btn-sm" onClick={signOut}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/Login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link href="/SignUp" className="btn btn-neutral btn-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}