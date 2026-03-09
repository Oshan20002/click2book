"use client";
// This page runs on the client side

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPassword() {

  // Store email input
  const [email, setEmail] = useState("");

  // Loading state while sending reset email
  const [loading, setLoading] = useState(false);

  // Success message
  const [message, setMessage] = useState("");

  // Error message
  const [error, setError] = useState("");

  // Function to send password reset email
  const handleReset = async () => {
    setError(""); // clear previous error
    setMessage(""); // clear previous message

    // Check if email is empty
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);   // show loading spinner

    // Send reset password email via Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/ResetPassword`,
    });

    setLoading(false);

    // If error occurs
    if (error) {
      setError(error.message);
    } else {
      // Success message
      setMessage("Password reset link sent. Please check your email.");
    }
  };

  return (
    <main>
      <h1 className="text-center mt-10 font-bold text-4xl">Forgot Password</h1>

      <div className="w-full max-w-md mx-auto mt-8 px-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-10">

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="alert alert-success mb-4">
              <span>{message}</span>
            </div>
          )}

          <label className="label">Enter your email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="btn btn-neutral w-full mt-5"
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Send Reset Link"
            )}
          </button>

        </fieldset>
      </div>
    </main>
  );
}