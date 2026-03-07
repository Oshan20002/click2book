"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, profile, loading, signOut } = useAuth();

  return (
    <nav className="navbar bg-base-100 border-b px-6">

      {/* ── Brand ─────────────────────────────────────────────────────── */}
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">
          Click2Book
        </Link>
      </div>

      {/* ── Auth section ──────────────────────────────────────────────── */}
      <div className="flex-none flex items-center gap-3">

        {/* Render nothing while the session check is in progress.
            This is what prevents the "Login/SignUp flash" on page load. */}
        {!loading && (
          <>
            {user ? (
              // Logged-in state
              <>
                <span className="text-sm font-medium hidden sm:inline">
                  {profile
                    ? `${profile.first_name} ${profile.last_name}`
                    : user.email}
                </span>

                {/* Provider-only dashboard link */}
                {profile &&
                  (Array.isArray(profile.role)
                    ? profile.role.includes("provider")
                    : profile.role === "provider") && (
                    <Link
                      href="/ProviderDashbord"
                      className="btn btn-ghost btn-sm"
                    >
                      Provoder Dashboard
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
              // Logged-out state
              <>
                <Link href="/Login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link href="/SignUp" className="btn btn-neutral btn-sm">
                  Sign Up
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}