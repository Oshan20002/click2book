"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

/* Category → Image Mapping */
const categoryImages: Record<string, string> = {
  "Health & Medical":
    "https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/helthcare.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaGVsdGhjYXJlLmpwZyIsImlhdCI6MTc2MTI4OTc2MywiZXhwIjoxODQ3Njg5NzYzfQ.WwdqaHdjiC14uHeq8Lex7EZ_9NHOr6KnPq7nNLarxq4",

  "Education & Tutoring":
    "https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/education.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvZWR1Y2F0aW9uLmpwZyIsImlhdCI6MTc2MTI5MDEzMSwiZXhwIjoxNzkyODI2MTMxfQ.4868g02rfwRGp9oh-pJz1iBS2LwCsd4Fyv-d5dCECLY",

  "Beauty & Wellness":
    "https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/saloon.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2Fsb29uLmpwZyIsImlhdCI6MTc2MTI5MDM4MiwiZXhwIjoxNzkyODI2MzgyfQ.Md4yFGP20W2bK1yTc9sY6JxixtTqb625-Q9Dk_fVdz8",

  "Home Services":
    "https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/homeservice.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaG9tZXNlcnZpY2UuanBnIiwiaWF0IjoxNzYxMjkwOTYyLCJleHAiOjE3OTI4MjY5NjJ9.xwPueH2UnVuiBYPiTW9Evy0yB26Rx-ZYInwHmeKEaUg",

  "Technology & IT":
    "https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/tech.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdGVjaC5qcGciLCJpYXQiOjE3NjEyOTEyMTUsImV4cCI6MTc5MjgyNzIxNX0.D43Vo0-iFmL4SUS3rT1HQ4alKsLDBPkyYg1kzPbdkYI",
};

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const router = useRouter();

  const [service, setService] = useState<any>(null);
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.push("/Login");
        return;
      }

      const { data: serviceData } = await supabase
        .from("services")
        .select("*")
        .eq("id", serviceId)
        .single();

      if (!serviceData) {
        router.push("/provider-dashboard");
        return;
      }

      setService(serviceData);

      const { data: adsData } = await supabase
        .from("ads")
        .select("*")
        .eq("service_id", serviceId)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      setAds(adsData || []);
      setLoading(false);
    };

    fetchService();
  }, [router, serviceId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 border rounded-md shadow-md">
      {/* CATEGORY IMAGE */}
      <img
        src={
          categoryImages[service.category] ||
          "/no-image.png"
        }
        alt={service.category}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 className="text-2xl font-bold mb-2">
        {service.service_name}
      </h1>

      <p className="text-gray-600 mb-4">
        {service.category}
      </p>

      <p className="mb-6">{service.description}</p>

      {/* Buttons */}
      <div className="flex gap-6 mb-10">
        <Link
          href={`/provider/services/${service.id}/new-ad`}
          className="btn btn-primary"
        >
          Put a New Ad
        </Link>

        <Link
          href={`/provider/services/${service.id}/manage-ads`}
          className="btn btn-accent"
        >
          Manage Ads
        </Link>
      </div>

      {/* Active Ads */}
      <h2 className="text-xl font-semibold mb-4">
        Active Advertisements
      </h2>

      {ads.length === 0 ? (
        <p className="text-gray-500">
          No active ads yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="border rounded-lg p-4 shadow"
            >
              <h3 className="font-bold text-lg">
                {ad.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {ad.status.toUpperCase()}
              </p>
              <p className="text-sm">{ad.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
