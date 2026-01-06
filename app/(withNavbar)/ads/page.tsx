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

dayjs.extend(utc);
dayjs.extend(timezone);

/* ================= TYPES ================= */

type Ad = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  slot_start_time: string; // "09:00 AM"
  slot_duration: number; // minutes
  number_of_slots: number;
  banner_url?: string;
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

  /* ================= FETCH ADS ================= */

  useEffect(() => {
    if (!category) return;

    const now = dayjs().tz("Asia/Colombo").toISOString();

    supabase
      .from("ads")
      .select("*")
      .eq("category", category)
      .lte("ad_start_time", now) // ad already started
      .gte("ad_end_time", now) // ad not expired
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          setAds([]);
          return;
        }

        setAds(data || []);
      });
  }, [category]);

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
      .eq("status", "pending")
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

    supabase
      .from("ad_slot_schedules")
      .select("slot_date")
      .eq("ad_id", selectedAd.id)
      .then(({ data }) => {
        const days = data?.map((d) => d.slot_date) || [];
        setAvailableDays(days);
        setSelectedDate(days[0] || "");
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

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login to book");
      return;
    }

    // 1️⃣ Create booking as PENDING
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

    // 2️⃣ Redirect to PayHere sandbox payment link
    // Rs 1000 payment
    window.location.href =
      "https://sandbox.payhere.lk/pay/o6aa6cd2d?order_id=" + bookingId;
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
              <p>{ad.description}</p>
              <p className="font-bold">Rs {ad.price}</p>

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
                const isBooked = bookedSlots.includes(s.start);

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
    </main>
  );
}
