"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Booking = {
  id: string;
  slot_date: string;
  slot_start: string;
  slot_end: string;
  status: string;
  total_price: number;
  ads: {
    title: string;
  };
};

type Profile = {
  role: string[];
};

export default function ActivityCenter() {
  const [profile, setProfile] = useState<Profile | null>(null);

  // MAIN TABS
  const [activeTab, setActiveTab] = useState<
    "my-bookings" | "my-services"
  >("my-bookings");

  // SUB TABS
  const [subTab, setSubTab] = useState<"ongoing" | "past">("ongoing");

  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [myServices, setMyServices] = useState<Booking[]>([]);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      // CUSTOMER BOOKINGS
      const { data: bookings } = await supabase
        .from("bookings")
        .select("*, ads(title)")
        .eq("user_id", user.id)
        .order("slot_date", { ascending: false });

      setMyBookings(bookings || []);

      // PROVIDER SERVICES
      if (profileData?.role.includes("provider")) {
        const { data: services } = await supabase
          .from("bookings")
          .select("*, ads!inner(title, provider_id)")
          .eq("ads.provider_id", user.id)
          .order("slot_date", { ascending: false });

        setMyServices(services || []);
      }
    };

    load();
  }, []);

  if (!profile) return <p className="p-10">Loading...</p>;

  const isProvider = profile.role.includes("provider");

  /* ================= MARK SERVICE COMPLETED ================= */

  const markServiceCompleted = async (bookingId: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "service_completed" })
      .eq("id", bookingId);

    if (!error) {
      setMyServices((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "service_completed" } : b
        )
      );
      setMyBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "service_completed" } : b
        )
      );
    }
  };

  /* ================= FILTERED DATA ================= */

  const filterByTab = (data: Booking[]) =>
    data.filter((b) =>
      subTab === "ongoing"
        ? b.status === "completed"
        : b.status === "service_completed"
    );

  /* ================= UI ================= */

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Activity Center</h1>

      {/* MAIN TABS */}
      <div className="flex border-b mb-4">
        <button
          className={`px-6 py-2 font-semibold ${
            activeTab === "my-bookings"
              ? "border-b-2 border-primary"
              : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("my-bookings");
            setSubTab("ongoing");
          }}
        >
          My Bookings
        </button>

        {isProvider && (
          <button
            className={`px-6 py-2 font-semibold ${
              activeTab === "my-services"
                ? "border-b-2 border-primary"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("my-services");
              setSubTab("ongoing");
            }}
          >
            My Services
          </button>
        )}
      </div>

      {/* SUB TABS */}
      <div className="flex gap-4 mb-6">
        <button
          className={`btn btn-sm ${
            subTab === "ongoing" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setSubTab("ongoing")}
        >
          Ongoing
        </button>

        <button
          className={`btn btn-sm ${
            subTab === "past" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setSubTab("past")}
        >
          Past
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === "my-bookings" && (
        <BookingList bookings={filterByTab(myBookings)} />
      )}

      {activeTab === "my-services" && (
        <>
          {subTab === "ongoing" && (
            <ServiceOngoing
              bookings={filterByTab(myServices)}
              onComplete={markServiceCompleted}
            />
          )}

          {subTab === "past" && (
            <BookingList bookings={filterByTab(myServices)} />
          )}
        </>
      )}
    </main>
  );
}

/* ================= COMPONENTS ================= */

function ServiceOngoing({
  bookings,
  onComplete,
}: {
  bookings: Booking[];
  onComplete: (id: string) => void;
}) {
  if (bookings.length === 0)
    return <p className="text-gray-500">No ongoing services.</p>;

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div key={b.id} className="border rounded p-4 flex justify-between">
          <div>
            <p className="font-semibold">{b.ads.title}</p>
            <p className="text-sm">
              {b.slot_date} | {b.slot_start} – {b.slot_end}
            </p>
          </div>

          <button
            className="btn btn-success btn-sm"
            onClick={() => onComplete(b.id)}
          >
            Service Completed
          </button>
        </div>
      ))}
    </div>
  );
}

function BookingList({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0)
    return <p className="text-gray-500">No records found.</p>;

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div key={b.id} className="border rounded p-4 flex justify-between">
          <div>
            <p className="font-semibold">{b.ads.title}</p>
            <p className="text-sm">
              {b.slot_date} | {b.slot_start} – {b.slot_end}
            </p>
            <p className="text-sm capitalize">
              Status : {b.status.replace("_", " ")}
            </p>
          </div>

          <p className="font-bold">Rs {b.total_price}</p>
        </div>
      ))}
    </div>
  );
}
