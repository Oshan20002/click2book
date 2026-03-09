"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ResetPassword() {

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {

    setError("");
    setMessage("");

    if (!password || !confirm) {
      setError("Please fill both fields.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Password updated successfully. Redirecting to login...");

    // logout user after password reset
    await supabase.auth.signOut();

    setLoading(false);

    setTimeout(() => {
      router.replace("/Login");
    }, 1500);
  };

  return (
    <main>

      <h1 className="text-center mt-10 font-bold text-4xl">
        Reset Password
      </h1>

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

          <label className="label">New Password</label>

          <input
            type="password"
            className="input w-full"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="label mt-3">Confirm Password</label>

          <input
            type="password"
            className="input w-full"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            className="btn btn-neutral w-full mt-5"
            onClick={handleUpdate}
            disabled={loading}
          >

            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Update Password"
            )}

          </button>

        </fieldset>

      </div>

    </main>
  );
}