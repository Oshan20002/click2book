"use client";

// app/Login/page.tsx
//
// Uses useAuth() to read existing session from context (no independent query).
// After signInWithPassword succeeds, onAuthStateChange in AuthContext fires
// SIGNED_IN and updates the navbar automatically — no router.refresh() needed.

import React, { useState, useEffect, ChangeEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in. Wait for loading=false first to avoid
  // redirecting before the initial session check completes.
  useEffect(() => {
    if (!loading && user) router.push("/");
  }, [user, loading, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setSubmitting(false);

    if (loginError) {
      setError(loginError.message);
      return;
    }

    // AuthContext's onAuthStateChange fires SIGNED_IN here automatically,
    // updating the navbar without any router.refresh() race condition.
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <main>
      <h1 className="text-center mt-10 font-bold text-5xl">Click2Book</h1>
      <h2 className="text-center mt-5 font-bold text-3xl">Welcome Back</h2>
      <h2 className="text-center mt-5 font-bold text-2xl">Login</h2>

      <div className="w-full max-w-md mx-auto mt-5 px-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-10">

          {error && (
            <div className="alert alert-error mb-4 text-sm">
              <span>{error}</span>
            </div>
          )}

          <label className="label">Email Address</label>
          <input
            name="email"
            type="email"
            className="input w-full"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={handleChange}
          />

          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            className="input w-full"
            placeholder="Enter Your Password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="flex justify-between items-center mt-2 mb-4">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="checkbox"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              />
              <label className="label">Remember me</label>
            </div>
            <a href="/forgot-password" className="text-blue-500 underline text-sm">
              Forgot Password?
            </a>
          </div>

          <button
            className="btn btn-neutral mt-4 w-full"
            onClick={handleLogin}
            disabled={submitting}
          >
            {submitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : "Login"}
          </button>

          <div className="divider">Or Login with</div>

          <div className="flex gap-4 w-full">
            <button className="btn bg-white text-black border w-1/2">
              Login with Google
            </button>
            <button className="btn bg-[#1A77F2] text-white w-1/2">
              Login with Facebook
            </button>
          </div>

          <p className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <a href="/SignUp" className="font-bold underline">Sign Up here</a>
          </p>
        </fieldset>
      </div>
    </main>
  );
}