"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Ad = {
  id: string;
  title: string;
  category: string;
  description: string;
  provider_id: string;
  service_id: string;
  start_time: string; // "HH:MM" or timestamp
  end_time: string;   // "HH:MM" or timestamp
  slot_gap: number;   // in minutes (optional if not needed)
  number_of_slots: number; // new field from table
  banner_url?: string;
};

export default function AdsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("category", category);

      if (error) {
        console.error("Supabase error:", error);
        setAds([]);
      } else {
        setAds(data || []);
      }

      setLoading(false);
    };

    if (category) fetchAds();
  }, [category]);

  return (
    <main className="px-10 py-10">
      <h1 className="text-4xl font-bold mb-6">{category} Ads</h1>

      {loading && <p>Loading ads...</p>}

      {!loading && ads.length === 0 && <p>No ads found for this category.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ads.map((ad) => (
          <div key={ad.id} className="card bg-base-100 shadow-lg border">
            {ad.banner_url && (
              <img
                src={ad.banner_url}
                alt={ad.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="card-body">
              <h2 className="card-title">{ad.title}</h2>
              <p className="text-sm text-gray-800">{ad.category}</p>
              <p className="text-sm text-gray-500">{ad.description}</p>
              <p className="text-sm text-green-600 font-semibold">
                Slots: {ad.number_of_slots} {/* Directly from table */}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Contact Provider</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
