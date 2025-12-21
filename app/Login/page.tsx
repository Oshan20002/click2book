"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    role: "customer",
    email: "",
    password: "",
    remember: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Optional: store role in localStorage if needed
    localStorage.setItem("role", form.role);

    alert("Login successful!");
    router.push("/Home"); // Redirect to your Home page
  };

  return (
    <main>
      <h1 className="text-center mt-10 font-bold text-5xl">Click2Book</h1>
      <h2 className="text-center mt-5 font-bold text-3xl">Welcome Back</h2>
      <h2 className="text-center mt-5 font-bold text-2xl">Login</h2>

      <div className="w-1/3 mx-auto mt-5">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-10">
          <label className="label text-xl">I am a</label>

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

          {/* EMAIL */}
          <label className="label">Email Address</label>
          <input
            name="email"
            type="email"
            className="input w-full"
            placeholder="Enter Your Email"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            className="input w-full"
            placeholder="Enter Your Password"
            onChange={handleChange}
          />

          <br />
          <div className="flex justify-between items-center mt-2 mb-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={form.remember}
                onChange={(e) =>
                  setForm({ ...form, remember: e.target.checked })
                }
              />
              <label className="label">Remember me</label>
            </div>
            <a href="/forgot-password" className="text-blue-500 underline">
              Forgot Password?
            </a>
          </div>

          <button
            className="btn btn-neutral mt-4 w-full"
            onClick={handleLogin}
          >
            Login
          </button>

          <div className="divider">Or Login with</div>

          <div className="flex gap-4 w-full">
            {/* Social login (UI only, integrate Supabase OAuth if needed) */}
            <button className="btn bg-white text-black border w-1/2">
              Login with Google
            </button>
            <button className="btn bg-[#1A77F2] text-white w-1/2">
              Login with Facebook
            </button>
          </div>

          <p className="text-center mt-4">
            <u>
              Don't have an account?{" "}
              <b>
                <a href="/SignUp">SignUp here</a>
              </b>
            </u>
          </p>
        </fieldset>
      </div>
    </main>
  );
}
