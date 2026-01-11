"use client";

type Props = {
  searchParams: {
    category?: string;
  };
};

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

/* ================= PAYHERE LINKS ================= */

const PAYHERE_PAYMENT_LINKS: Record<number, string> = {
  5000: "https://sandbox.payhere.lk/pay/o8c9ed68b",
  4900: "https://sandbox.payhere.lk/pay/o15978731",
  4800: "https://sandbox.payhere.lk/pay/o6290b7a7",
  4700: "https://sandbox.payhere.lk/pay/ofcf42204",
  4600: "https://sandbox.payhere.lk/pay/o8bf31292",
  4500: "https://sandbox.payhere.lk/pay/o12fa4328",
  4400: "https://sandbox.payhere.lk/pay/o65fd73be",
  4300: "https://sandbox.payhere.lk/pay/ocfa5ce0a",
  4200: "https://sandbox.payhere.lk/pay/ob8a2fe9c",
  4100: "https://sandbox.payhere.lk/pay/o281de30d",
  4000: "https://sandbox.payhere.lk/pay/o5f1ad39b",
  3900: "https://sandbox.payhere.lk/pay/oc6138221",
  3800: "https://sandbox.payhere.lk/pay/ob114b2b7",
  3700: "https://sandbox.payhere.lk/pay/o2f702714",
  3600: "https://sandbox.payhere.lk/pay/o58771782",
  3500: "https://sandbox.payhere.lk/pay/oc17e4638",
  3400: "https://sandbox.payhere.lk/pay/ob67976ae",
  3300: "https://sandbox.payhere.lk/pay/od6beff4b",
  3200: "https://sandbox.payhere.lk/pay/oa1b9cfdd",
  3100: "https://sandbox.payhere.lk/pay/o3106d24c",
  3000: "https://sandbox.payhere.lk/pay/o4601e2da",
  2900: "https://sandbox.payhere.lk/pay/odf08b360",
  2800: "https://sandbox.payhere.lk/pay/oa80f83f6",
  2700: "https://sandbox.payhere.lk/pay/o366b1655",
  2600: "https://sandbox.payhere.lk/pay/o416c26c3",
  2500: "https://sandbox.payhere.lk/pay/od8657779",
  2400: "https://sandbox.payhere.lk/pay/oaf6247ef",
  2300: "https://sandbox.payhere.lk/pay/o5126e384",
  2200: "https://sandbox.payhere.lk/pay/o2621d312",
  2100: "https://sandbox.payhere.lk/pay/ob69ece83",
  2000: "https://sandbox.payhere.lk/pay/oc199fe15",
  1900: "https://sandbox.payhere.lk/pay/o5890afaf",
  1800: "https://sandbox.payhere.lk/pay/o2f979f39",
  1700: "https://sandbox.payhere.lk/pay/ob1f30a9a",
  1600: "https://sandbox.payhere.lk/pay/oc6f43a0c",
  1500: "https://sandbox.payhere.lk/pay/o5ffd6bb6",
  1400: "https://sandbox.payhere.lk/pay/o28fa5b20",
  1300: "https://sandbox.payhere.lk/pay/o483dd2c5",
  1200: "https://sandbox.payhere.lk/pay/o3f3ae253",
  1100: "https://sandbox.payhere.lk/pay/oaf85ffc2",
  1000: "https://sandbox.payhere.lk/pay/ofb99e61d",
  900: "https://sandbox.payhere.lk/pay/od882cf54",
  800: "https://sandbox.payhere.lk/pay/o418b9eee",
  700: "https://sandbox.payhere.lk/pay/o368cae78",
  600: "https://sandbox.payhere.lk/pay/oa8e83bdb",
  500: "https://sandbox.payhere.lk/pay/odfef0b4d",
  400: "https://sandbox.payhere.lk/pay/o46e65af7",
  300: "https://sandbox.payhere.lk/pay/o31e16a61",
  200: "https://sandbox.payhere.lk/pay/o63108106",
  100: "https://sandbox.payhere.lk/pay/o1417b190",
};

const getPaymentLink = (amount: number): string | null => {
  return PAYHERE_PAYMENT_LINKS[amount] ?? null;
};

/* ================= TYPES ================= */

type Ad = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  banner_url?: string;

  service_id: string;

  services?: {
    city: string;
    map_url: string;
  };

  rating?: {
    avg: number;
    count: number;
  };
};

type ExtraService = {
  service_name: string;
  price: number;
  duration: number;
};

type Slot = {
  start: string;
  end: string;
};

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-sm ${
            value >= i
              ? "text-yellow-400"
              : value >= i - 0.5
              ? "text-yellow-300"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ================= COMPONENT ================= */

export default function AdsPage({ searchParams }: Props) {
  const category = searchParams.category ?? "";

  const [ads, setAds] = useState<Ad[]>([]);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  // Booking modal state
  const [extras, setExtras] = useState<ExtraService[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<ExtraService[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Already booked slots (pending)
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // VIEW ALL RATINGS
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [showRatingsModal, setShowRatingsModal] = useState(false);

  /* ================= FETCH ADS ================= */

  useEffect(() => {
    const now = dayjs().tz("Asia/Colombo").toISOString();

    let query = supabase
      .from("ads")
      .select(
        `
      *,
      service_id,
      services (
        city,
        map_url
      )
    `
      )
      .lte("ad_start_time", now)
      .gte("ad_end_time", now);

    // ✅ Apply category filter ONLY if category exists
    if (category) {
      query = query.eq("category", category);
    }

    query.then(({ data, error }) => {
      if (error) {
        console.error(error);
        setAds([]);
        return;
      }

      setAds(data || []);
    });
  }, [category]);

  /* ================= FETCH SERVICE RATINGS ================= */

  useEffect(() => {
    if (!ads.length) return;

    const loadRatings = async () => {
      const serviceIds = Array.from(new Set(ads.map((ad) => ad.service_id)));

      const { data, error } = await supabase
        .from("ratings")
        .select("service_id, stars")
        .in("service_id", serviceIds);

      if (error || !data) return;

      const ratingMap: Record<string, { sum: number; count: number }> = {};

      data.forEach((r) => {
        if (!ratingMap[r.service_id]) {
          ratingMap[r.service_id] = { sum: 0, count: 0 };
        }
        ratingMap[r.service_id].sum += r.stars;
        ratingMap[r.service_id].count += 1;
      });

      setAds((prev) =>
        prev.map((ad) => {
          const rating = ratingMap[ad.service_id];
          if (!rating) return ad;

          return {
            ...ad,
            rating: {
              avg: rating.sum / rating.count,
              count: rating.count,
            },
          };
        })
      );
    };

    loadRatings();
  }, [ads.map((a) => a.id).join(",")]);

  useEffect(() => {
    if (!ads.length) return;

    const testRatings = async () => {
      console.log("==== RATING TEST START ====");

      // 1️⃣ Show active ads + service IDs
      ads.forEach((ad) => {
        console.log("Ad:", ad.id, "Service:", ad.service_id);
      });

      // 2️⃣ Fetch ratings by service_id
      const serviceIds = Array.from(new Set(ads.map((ad) => ad.service_id)));

      console.log("Service IDs used for rating query:", serviceIds);

      const { data, error } = await supabase
        .from("ratings")
        .select("service_id, stars")
        .in("service_id", serviceIds);

      if (error) {
        console.error("Rating query error:", error);
        return;
      }

      console.log("Raw ratings rows:", data);

      // 3️⃣ Calculate averages
      const ratingMap: Record<string, { sum: number; count: number }> = {};

      data?.forEach((r) => {
        if (!ratingMap[r.service_id]) {
          ratingMap[r.service_id] = { sum: 0, count: 0 };
        }
        ratingMap[r.service_id].sum += r.stars;
        ratingMap[r.service_id].count += 1;
      });

      console.log("Calculated rating map:", ratingMap);

      // 4️⃣ Final averages
      Object.entries(ratingMap).forEach(([sid, r]) => {
        console.log(`Service ${sid} → Average = ${r.sum / r.count}`);
      });

      console.log("==== RATING TEST END ====");
    };

    testRatings();
  }, [ads.map((a) => a.id).join(",")]);

  /* ================= FETCH EXTRA SERVICES ================= */

  useEffect(() => {
    if (!selectedAd) return;

    supabase
      .from("ad_services")
      .select("*")
      .eq("ad_id", selectedAd.id)
      .then(({ data }) => setExtras(data || []));
  }, [selectedAd]);

  /* ================= FETCH BOOKED SLOTS ================= */
  useEffect(() => {
    if (!selectedAd || !selectedDate) return;

    supabase
      .from("bookings")
      .select("slot_start")
      .eq("ad_id", selectedAd.id)
      .eq("slot_date", selectedDate)
      .eq("status", "completed")
      .then(({ data }) => {
        setBookedSlots(data ? data.map((b) => b.slot_start) : []);
      });
  }, [selectedAd, selectedDate]);

  // GENERATE SLOTS FOR SELECTED DAY

  useEffect(() => {
    if (!selectedAd || !selectedDate) return;

    supabase
      .from("ad_slot_schedules")
      .select(
        `
      id,
      slot_start_time,
      start_period,
      slot_duration,
      number_of_slots,
      ad_slot_break_times (
        break_start,
        break_end
      )
    `
      )
      .eq("ad_id", selectedAd.id)
      .eq("slot_date", selectedDate)
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error || !data) {
          setSlots([]);
          return;
        }

        const breaks = data.ad_slot_break_times || [];
        const temp: Slot[] = [];

        // 🔁 helper: time → minutes
        const timeToMinutes = (time: string, period: string) => {
          const [h, m] = time.split(":").map(Number);
          let hours = h;

          if (period === "PM" && h !== 12) hours += 12;
          if (period === "AM" && h === 12) hours = 0;

          return hours * 60 + m;
        };

        // 🔁 helper: check break
        const isInBreak = (time: number) => {
          return breaks.some((b) => {
            const start = timeToMinutes(b.break_start, data.start_period);
            const end = timeToMinutes(b.break_end, data.start_period);
            return time >= start && time < end;
          });
        };

        let currentMinutes = timeToMinutes(
          data.slot_start_time,
          data.start_period
        );

        let createdSlots = 0;

        while (createdSlots < data.number_of_slots) {
          // ⛔ skip break time
          if (isInBreak(currentMinutes)) {
            const activeBreak = breaks.find((b) => {
              const start = timeToMinutes(b.break_start, data.start_period);
              const end = timeToMinutes(b.break_end, data.start_period);
              return currentMinutes >= start && currentMinutes < end;
            });

            if (activeBreak) {
              currentMinutes = timeToMinutes(
                activeBreak.break_end,
                data.start_period
              );
            }
            continue;
          }

          const startTime = dayjs(selectedDate)
            .hour(Math.floor(currentMinutes / 60))
            .minute(currentMinutes % 60);

          const endTime = startTime.add(data.slot_duration, "minute");

          temp.push({
            start: startTime.format("hh:mm A"),
            end: endTime.format("hh:mm A"),
          });

          currentMinutes += data.slot_duration;
          createdSlots++;
        }

        setSlots(temp);
      });
  }, [selectedAd, selectedDate]);

  /* ================= GENERATE TIME SLOTS ================= */

  useEffect(() => {
    if (!selectedAd) return;

    const today = dayjs().tz("Asia/Colombo").startOf("day");

    supabase
      .from("ad_slot_schedules")
      .select("slot_date")
      .eq("ad_id", selectedAd.id)
      .then(({ data }) => {
        if (!data) return;

        const validDays = data
          .map((d) => d.slot_date)
          .filter((date) =>
            dayjs(date).tz("Asia/Colombo").isSameOrAfter(today)
          );

        setAvailableDays(validDays);
        setSelectedDate(validDays[0] || "");
      });
  }, [selectedAd]);

  /* ================= TOGGLE EXTRA ================= */

  const toggleExtra = (service: ExtraService) => {
    setSelectedExtras((prev) =>
      prev.some((s) => s.service_name === service.service_name)
        ? prev.filter((s) => s.service_name !== service.service_name)
        : [...prev, service]
    );
  };

  /* ================= TOTAL PRICE ================= */

  const totalPrice =
    (selectedAd?.price || 0) +
    selectedExtras.reduce((sum, e) => sum + e.price, 0);

  /* ================= HANDLE BOOKING ================= */

  const handleBooking = async () => {
    if (!selectedAd || !selectedSlot) return;

    // 🚫 BLOCK PAST DATE BOOKINGS (FIX #2)
    const bookingDay = dayjs(selectedDate).tz("Asia/Colombo").startOf("day");

    const today = dayjs().tz("Asia/Colombo").startOf("day");

    if (bookingDay.isBefore(today)) {
      alert("You cannot book a past date");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login to book");
      return;
    }

    // 1️⃣ Create booking
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        ad_id: selectedAd.id,
        user_id: user.id,
        slot_date: selectedDate,
        slot_start: selectedSlot.start,
        slot_end: selectedSlot.end,
        total_price: totalPrice,
        status: "pending",
      })

      .select("id")
      .single();

    if (error || !data) {
      alert("Booking failed");
      return;
    }

    const bookingId = data.id;

    // TEMPORARY: manually map payment link → booking
    await supabase
      .from("bookings")
      .update({
        status: "pending",
      })
      .eq("id", bookingId);

    const payhereOrderId = `BOOKING_${bookingId}`;

    // 2️⃣ Save PayHere order id
    await supabase
      .from("bookings")
      .update({ payhere_order_id: payhereOrderId })
      .eq("id", bookingId);

    // 3️⃣ REDIRECT TO PAYHERE PAYMENT LINK (🔥 THIS IS THE KEY 🔥)
    const paymentLink = getPaymentLink(totalPrice);

    if (!paymentLink) {
      alert("No payment option available for this amount");
      return;
    }

    window.location.href = paymentLink;
  };

  /* ================= UI ================= */

  return (
    <main className="px-10 py-10">
      <h1 className="text-4xl font-bold mb-6">{category} Ads</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ads.map((ad) => (
          <div key={ad.id} className="card shadow border">
            {ad.banner_url && (
              <img src={ad.banner_url} className="h-48 w-full object-cover" />
            )}
            <div className="card-body">
              <h2 className="card-title">{ad.title}</h2>

              {ad.rating ? (
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                  <StarRating value={ad.rating.avg} />
                  <span>
                    {ad.rating.avg.toFixed(1)} ({ad.rating.count})
                  </span>

                  <button
                    className="text-blue-600 underline ml-2"
                    onClick={() => {
                      setSelectedServiceId(ad.service_id);
                      setShowRatingsModal(true);
                    }}
                  >
                    View all ratings
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-400 mt-1">No ratings yet</p>
              )}

              <p>{ad.description}</p>
              {ad.services?.city && (
                <p className="text-sm text-gray-600">📍 {ad.services.city}</p>
              )}

              <p className="font-bold">Rs {ad.price}</p>

              {ad.services?.map_url && (
                <a
                  href={ad.services.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm mb-2"
                >
                  📍 Find in Google Maps
                </a>
              )}

              <button
                className="btn btn-primary"
                onClick={() => setSelectedAd(ad)}
              >
                Set a Booking
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= BOOKING MODAL ================= */}

      {selectedAd && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-[500px] rounded max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{selectedAd.title}</h2>

            {/* Services */}
            <h3 className="font-semibold mb-2">Services</h3>

            <label className="flex gap-2 mb-2">
              <input type="checkbox" checked disabled />
              {selectedAd.title} – Rs {selectedAd.price}
            </label>

            {extras.map((s) => (
              <label key={s.service_name} className="flex gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedExtras.some(
                    (e) => e.service_name === s.service_name
                  )}
                  onChange={() => toggleExtra(s)}
                />
                {s.service_name} – Rs {s.price}
              </label>
            ))}

            <p className="font-bold mt-2">Total: Rs {totalPrice}</p>

            {/* DAY SELECTOR */}

            <h3 className="font-semibold mt-4 mb-2">Select Day</h3>

            <select
              className="select select-bordered w-full mb-4"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {availableDays.map((day) => (
                <option key={day} value={day}>
                  {dayjs(day).format("dddd, MMM D")}
                </option>
              ))}
            </select>

            {/* Slots */}
            <h3 className="font-semibold mt-4 mb-2">Select Time Slot</h3>

            <div className="grid grid-cols-2 gap-2">
              {slots.map((s, i) => {
                const now = dayjs().tz("Asia/Colombo");

                const slotDateTime = dayjs(
                  `${selectedDate} ${s.start}`,
                  "YYYY-MM-DD hh:mm A"
                ).tz("Asia/Colombo");

                const isPastSlot =
                  dayjs(selectedDate).isSame(now, "day") &&
                  slotDateTime.isBefore(now);

                const isBooked = bookedSlots.includes(s.start) || isPastSlot;

                return (
                  <button
                    key={i}
                    disabled={isBooked}
                    className={`btn btn-sm ${
                      isBooked
                        ? "btn-disabled bg-gray-300 text-gray-500"
                        : selectedSlot === s
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                    onClick={() => !isBooked && setSelectedSlot(s)}
                  >
                    {s.start} – {s.end}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="btn btn-ghost"
                onClick={() => setSelectedAd(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                disabled={!selectedSlot}
                onClick={handleBooking}
              >
                Book & Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {showRatingsModal && selectedServiceId && (
        <RatingsModal
          serviceId={selectedServiceId}
          onClose={() => {
            setShowRatingsModal(false);
            setSelectedServiceId(null);
          }}
        />
      )}
    </main>
  );
}

function RatingsModal({
  serviceId,
  onClose,
}: {
  serviceId: string;
  onClose: () => void;
}) {
  const [ratings, setRatings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRatings = async () => {
      const { data } = await supabase
        .from("ratings")
        .select("stars, comment, created_at")
        .eq("service_id", serviceId)
        .order("created_at", { ascending: false });

      setRatings(data || []);
      setLoading(false);
    };

    loadRatings();
  }, [serviceId]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Service Ratings</h2>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card bg-base-100 shadow-md animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="card-body space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-300 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && ratings.length === 0 && (
          <p className="text-gray-500">No ratings yet.</p>
        )}

        <div className="space-y-4">
          {ratings.map((r, idx) => (
            <div key={idx} className="border-b pb-2">
              <p className="font-semibold">⭐ {r.stars}</p>
              {r.comment && (
                <p className="text-sm text-gray-600">{r.comment}</p>
              )}
              <p className="text-xs text-gray-400">
                {new Date(r.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
