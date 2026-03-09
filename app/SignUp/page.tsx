"use client";
// This page runs on the client side

import React, { useState, ChangeEvent, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignUp() {
  const router = useRouter();
  const { user, loading } = useAuth();

    // Form state to store all user input values
  const [form, setForm] = useState({
    role: "customer",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");


    // If user is already logged in, redirect to homepage
  useEffect(() => {
    if (!loading && user) router.push("/");
  }, [user, loading, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });


    // Sign up logic
  const handleSignUp = async () => {
    setError(""); // clear previous errors

    // Check if user agreed to terms
    if (!form.agree) {
      setError("You must agree to Terms and Conditions.");
      return;
    }

    // Check password confirmation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

     // Check required fields
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    // Password minimum length validation
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    // Create user in Supabase Authentication
    // Also store extra data as metadata
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          role: form.role,
        },
      },
    });


    // If Supabase returns error
    if (authError) {
      setError(authError.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);

    router.push("/Login");
  };

  // Show loading spinner while auth state is loading
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
      <h2 className="text-center mt-5 font-bold text-2xl">Sign Up</h2>

      <div className="w-full max-w-md mx-auto mt-5 px-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-10">

          {error && (
            <div className="alert alert-error mb-4 text-sm">
              <span>{error}</span>
            </div>
          )}

          <label className="label text-xl">I want to join as a</label>
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              className={`btn btn-wide border-black ${
                form.role === "customer" ? "btn-active" : ""
              }`}
              onClick={() => setForm({ ...form, role: "customer" })}
            >
              Customer
            </button>

            <button
              type="button"
              className={`btn btn-wide border-black ${
                form.role === "provider" ? "btn-active" : ""
              }`}
              onClick={() => setForm({ ...form, role: "provider" })}
            >
              Provider
            </button>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <label className="label">First Name</label>
              <input
                name="firstName"
                type="text"
                className="input w-full"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <label className="label">Last Name</label>
              <input
                name="lastName"
                type="text"
                className="input w-full"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

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
            placeholder="Create a Password (min. 6 characters)"
            value={form.password}
            onChange={handleChange}
          />

          <label className="label">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            className="input w-full"
            placeholder="Confirm Your Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <br />

          <div className="flex gap-4 items-start">
            <input
              type="checkbox"
              className="checkbox mt-1"
              defaultChecked
              onChange={(e) => setForm({ ...form, agree: e.target.checked })}
            />
            <p>
              I agree to the <b>Terms and Conditions</b> and <b>Privacy Policy</b>
            </p>
          </div>

          <br />

          <button
            className="btn btn-neutral mt-4 w-full"
            onClick={handleSignUp}
            disabled={submitting}
          >
            {submitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/Login" className="font-bold underline">
              Login here
            </a>
          </p>

        </fieldset>
      </div>
    </main>
  );
}