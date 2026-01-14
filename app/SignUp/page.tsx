"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";


export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    role: "customer",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSignUp = async () => {
    if (!form.agree) {
      alert("You must agree to Terms and Conditions");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      alert("Please fill in all required fields");
      return;
    }

    // 1️⃣ Create auth user
     const{ data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 2️⃣ Insert user profile
    const { error: profileError } = await supabase.from("users").insert({
      id: data?.user?.id,
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      role: form.role,
    });

    if (profileError) {
      alert(profileError.message);
      return;
    }

    alert("Account created successfully!");
    router.push("/Login");
  };

  return (
    <main>
      <h1 className="text-center mt-10 font-bold text-5xl ml-24">
        Click2Book
      </h1>
      <h2 className="text-center mt-5 font-bold text-2xl ml-24">
        SignUp
      </h2>

      <div className="w-1/3 mx-auto mt-5 ">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-10">
          <label className="label text-xl">I want to join as a</label>

          {/* ROLE BUTTONS */}
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

          {/* NAME */}
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <label className="label">First Name</label>
              <input
                name="firstName"
                type="text"
                className="input w-full"
                placeholder="First Name"
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
                onChange={handleChange}
              />
            </div>
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
            placeholder="Create a Password"
            onChange={handleChange}
          />

          <label className="label">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            className="input w-full"
            placeholder="Confirm Your Password"
            onChange={handleChange}
          />

          <br />

          {/* TERMS */}
          <div className="flex gap-4">
            <input
              type="checkbox"
              className="checkbox"
              defaultChecked
              onChange={(e) =>
                setForm({ ...form, agree: e.target.checked })
              }
            />
            <p>
              I agree to the <b>Terms and Conditions</b> and{" "}
              <b>Privacy Policy</b>
            </p>
          </div>

          <br />

          {/* SUBMIT */}
          <button
            className="btn btn-neutral mt-4 w-full"
            onClick={handleSignUp}
          >
            Create Account
          </button>

          <div className="divider">Or SignUp with</div>

          {/* SOCIAL (UI only) */}
          <div className="flex gap-24 w-full">
            <button className="btn bg-white text-black border w-5/12">
              Login with Google
            </button>

            <button className="btn bg-[#1A77F2] text-white w-5/12">
              Login with Facebook
            </button>
          </div>

          <br />

          <p className="text-center">
            <u>
              Already have an account?
              <b>
                <a href="/Login"> Login here</a>
              </b>
            </u>
          </p>
        </fieldset>
      </div>
    </main>
  );
}
