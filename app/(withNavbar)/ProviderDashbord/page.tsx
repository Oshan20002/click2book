"use client";

// app/ProviderDashbord/page.tsx
//
// Uses useAuth() — no independent session or profile queries.
// hasRole("provider") from context handles both string and array role types.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const categoryImages: Record<string, string> = {
  "Health & Medical": "https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/helthcare.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaGVsdGhjYXJlLmpwZyIsImlhdCI6MTc2MTI4OTc2MywiZXhwIjoxODQ3Njg5NzYzfQ.WwdqaHdjiC14uHeq8Lex7EZ_9NHOr6KnPq7nNLarxq4",
  "Education & Tutoring": "https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/education.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvZWR1Y2F0aW9uLmpwZyIsImlhdCI6MTc2MTI5MDEzMSwiZXhwIjoxNzkyODI2MTMxfQ.4868g02rfwRGp9oh-pJz1iBS2LwCsd4Fyv-d5dCECLY",
  "Beauty & Wellness": "https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/saloon.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2Fsb29uLmpwZyIsImlhdCI6MTc2MTI5MDM4MiwiZXhwIjoxNzkyODI2MzgyfQ.Md4yFGP20W2bK1yTc9sY6JxixtTqb625-Q9Dk_fVdz8",
  "Home Services": "https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/homeservice.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaG9tZXNlcnZpY2UuanBnIiwiaWF0IjoxNzYxMjkwOTYyLCJleHAiOjE3OTI4MjY5NjJ9.xwPueH2UnVuiBYPiTW9Evy0yB26Rx-ZYInwHmeKEaUg",
  "Technology & IT": "https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/tech.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdGVjaC5qcGciLCJpYXQiOjE3NjEyOTEyMTUsImV4cCI6MTc5MjgyNzIxNX0.D43Vo0-iFmL4SUS3rT1HQ4alKsLDBPkyYg1kzPbdkYI",
};

export default function ProviderDashboard() {
  const router = useRouter();
  const { user, profile, loading, hasRole } = useAuth();

  const [services, setServices] = useState<any[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [error, setError] = useState("");

  // Auth guard: wait for context to resolve, then check role.
  useEffect(() => {
    if (loading) return; // context still initialising
    if (!user) { router.push("/Login"); return; }
    if (!hasRole("provider")) { router.push("/"); return; }
  }, [user, loading, hasRole, router]);

  // Fetch services only once we know the user is a valid provider.
  useEffect(() => {
    if (!user || !hasRole("provider")) return;

    const fetchServices = async () => {
      setServicesLoading(true);
      const { data, error: fetchError } = await supabase
        .from("services")
        .select("*")
        .eq("provider_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) setError("Failed to load services.");
      setServices(data || []);
      setServicesLoading(false);
    };

    fetchServices();
  }, [user, hasRole]);

  // Show spinner while auth context or services are loading.
  if (loading || servicesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  // If we somehow land here without a profile, bail.
  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold">Provider Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome, {profile.first_name} {profile.last_name}
      </p>

      {error && (
        <div className="alert alert-error mb-4"><span>{error}</span></div>
      )}

      <div className="flex gap-6 mb-10">
        <Link href="/RegisterService" className="btn btn-primary">
          Register New Service
        </Link>
        <Link href="/ManageServices" className="btn btn-accent">
          Manage Services
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Services</h2>

      {services.length === 0 ? (
        <p className="text-gray-500">No services registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id}
              onClick={() => router.push(`/${service.id}`)}
              className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={categoryImages[service.category] || ""}
                alt={service.category}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{service.service_name}</h3>
                <p className="text-sm text-gray-600">{service.category}</p>
                <p className="text-sm mt-1">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}