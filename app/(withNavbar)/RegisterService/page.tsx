"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterService() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    service_name: "",
    description: "",
    category: "",
  });

  // 🔐 Auth + Provider Role Check
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/Login");
        return;
      }

      setUser(data.user);

      const { data: profileData } = await supabase
        .from("users")
        .select("id, role")
        .eq("id", data.user.id)
        .single();

      if (!profileData || profileData.role !== "provider") {
        router.push("/");
        return;
      }

      setProfile(profileData);
      setLoading(false);
    };

    init();
  }, [router]);

  // 📤 Submit Service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.from("services").insert({
      provider_id: user.id,
      service_name: form.service_name,
      description: form.description,
      category: form.category,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/ProviderDashbord");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register New Service</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Service Name"
          className="input input-bordered w-full"
          value={form.service_name}
          onChange={(e) =>
            setForm({ ...form, service_name: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Service Description"
          className="textarea textarea-bordered w-full"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <select
          className="select select-bordered w-full"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          required
        >
          <option value="" disabled>
            Select Service Category
          </option>
          <option value="Home Services">Home Services</option>
          <option value="Beauty & Wellness">Beauty & Wellness</option>
          <option value="Automotive">Automotive</option>
          <option value="Education & Tutoring">Education & Tutoring</option>
          <option value="Events & Entertainment">Events & Entertainment</option>
          <option value="Health & Medical">Health & Medical</option>
          <option value="Technology & IT">Technology & IT</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Register Service
        </button>
      </form>
    </div>
  );
}
