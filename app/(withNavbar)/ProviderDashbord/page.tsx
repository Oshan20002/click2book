"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ProviderDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/Login"); // redirect if not logged in
        return;
      }

      setUser(data.user);

      // fetch profile from users table
      const { data: profileData, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(profileData);

        // redirect if not a provider
        if (profileData.role !== "provider") {
          router.push("/"); // redirect non-providers
        }
      }

      setLoading(false);
    };

    fetchUser();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 h-52 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>
      <p className="mb-4">Welcome, {profile?.first_name + " " + profile?.last_name}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full ml-28">
        <Link
          href="/RegisterService"
          className="btn btn-primary w-full text-lg"
        >
          Register New Service
        </Link>

        <Link
          href="/ManageAds"
          className="btn btn-accent w-full text-lg"
        >
          Manage Services
        </Link>
      </div>
    </div>
  );
}
