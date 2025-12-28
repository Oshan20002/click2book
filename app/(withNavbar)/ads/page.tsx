"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Service = {
  id: string;
  service_name: string;
  category: string;
  description: string;
};

export default function AdsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("category", category);

      if (error) {
        console.error(error);
      } else {
        setServices(data || []);
      }

      setLoading(false);
    };

    if (category) fetchAds();
  }, [category]);

  return (
    <main className="px-10 py-10">
      <h1 className="text-4xl font-bold mb-6">
        {category} Services
      </h1>

      {loading && <p>Loading services...</p>}

      {!loading && services.length === 0 && (
        <p>No services available in this category.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="card bg-base-100 shadow-lg border"
          >
            <div className="card-body">
              <h2 className="card-title">
                {service.service_name}
              </h2>

              <p className="text-sm text-gray-500">
                {service.category}
              </p>

              <p>{service.description}</p>

              <div className="card-actions justify-end">
                <button className="btn btn-primary">
                  Contact Provider
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
