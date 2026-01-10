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
    id: string;
    title: string;
    service_id: string;
    provider_id?: string;
    services?: {
      city: string;
      map_url: string;
    };
  };
};

type Profile = {
  role: string[];
};

export default function ActivityCenter() {
  const [profile, setProfile] = useState<Profile | null>(null);

  // MAIN TABS
  const [activeTab, setActiveTab] = useState<"my-bookings" | "my-services">(
    "my-bookings"
  );

  // SUB TABS
  const [subTab, setSubTab] = useState<"ongoing" | "past">("ongoing");

  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [myServices, setMyServices] = useState<Booking[]>([]);
  const [ratingBooking, setRatingBooking] = useState<Booking | null>(null);

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
        .select(
          `
    *,
    ads (
      id,
    title,
    service_id,
    services (
      city,
      map_url
      )
    )
  `
        )
        .eq("user_id", user.id)
        .order("slot_date", { ascending: false });

      setMyBookings(bookings || []);

      // PROVIDER SERVICES
      if (profileData?.role.includes("provider")) {
        const { data: services } = await supabase
          .from("bookings")
          .select(
            `
    *,
    ads!inner (
      id,
  title,
  service_id,
  provider_id,
  services (
    city,
    map_url
      )
    )
  `
          )
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
      {activeTab === "my-bookings" && subTab === "ongoing" && (
        <BookingList bookings={filterByTab(myBookings)} />
      )}

      {activeTab === "my-bookings" && subTab === "past" && (
        <BookingList
          bookings={filterByTab(myBookings)}
          onRate={(b) => setRatingBooking(b)}
        />
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

      {ratingBooking && (
        <RatingModal
          booking={ratingBooking}
          onClose={() => setRatingBooking(null)}
        />
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
            {b.ads.services?.city && (
              <p className="text-sm text-gray-500">📍 {b.ads.services.city}</p>
            )}

            {b.ads.services?.map_url && (
              <a
                href={b.ads.services.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary text-sm"
              >
                📍 View on Google Maps
              </a>
            )}
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

function BookingList({
  bookings,
  onRate,
}: {
  bookings: Booking[];
  onRate?: (b: Booking) => void;
}) {
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
              Status : Payment {b.status.replace("_", " ")}
            </p>
            <p className="font-bold">Rs {b.total_price}</p>

            {onRate && (
              <button
                className="btn btn-sm btn-outline mt-2"
                onClick={() => onRate(b)}
              >
                ⭐ Rate Service
              </button>
            )}

            {b.ads.services?.city && (
              <p className="text-sm text-gray-500">📍 {b.ads.services.city}</p>
            )}
          </div>

          {b.ads.services?.map_url && (
            <a
              href={b.ads.services.map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary text-sm"
            >
              📍 View on Google Maps
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function RatingModal({
  booking,
  onClose,
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [ratingId, setRatingId] = useState<string | null>(null);

  /* ================= LOAD EXISTING RATING ================= */

  useEffect(() => {
    const loadExistingRating = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("ratings")
        .select("id, stars, comment")
        .eq("booking_id", booking.id)
        .eq("user_id", user.id)
        .single();

      // Ignore "no rows" error
      if (error && error.code !== "PGRST116") {
        console.error(error);
        return;
      }

      if (data) {
        setRatingId(data.id);
        setStars(data.stars);
        setComment(data.comment || "");
      }
    };

    loadExistingRating();
  }, [booking.id]);

  /* ================= SUBMIT (INSERT / UPDATE) ================= */

  const submitRating = async () => {
    if (stars < 1) {
      alert("Please select at least 1 star");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    let error;

    if (ratingId) {
      // UPDATE existing rating
      const res = await supabase
        .from("ratings")
        .update({
          stars,
          comment,
        })
        .eq("id", ratingId)
        .eq("user_id", user.id);

      error = res.error;
    } else {
      // INSERT new rating
      const res = await supabase.from("ratings").insert({
        booking_id: booking.id,
        ad_id: booking.ads.id,
        service_id: booking.ads.service_id,
        user_id: user.id,
        stars,
        comment,
      });

      error = res.error;
    }

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      onClose();
    }
  };

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {ratingId ? "Edit Your Rating" : "Rate Service"}
        </h2>

        {/* STARS */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setStars(s)}
              className={`text-3xl ${
                stars >= s ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* COMMENT */}
        <textarea
          placeholder="Write a comment (optional)"
          className="textarea textarea-bordered w-full mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={submitRating}
          >
            {ratingId ? "Update Rating" : "Submit Rating"}
          </button>
        </div>
      </div>
    </div>
  );
}
