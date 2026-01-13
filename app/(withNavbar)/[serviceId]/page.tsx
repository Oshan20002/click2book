"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/* ================= CATEGORY IMAGES ================= */
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
/* ================= TYPES ================= */
interface Service {
  id: string;
  service_name: string;
  category: string;
  district: string;
  city: string;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  ad_start_time: string;
  ad_end_time: string;
  price: number;
  banner_url?: string;

  slot_start_time?: string;
  slot_duration?: number;
  number_of_slots?: number;
}

interface AdService {
  service_name: string;
  price: string;
  duration: string;
}

interface SlotBreakTime {
  start: string;
  end: string;
}

interface SlotSchedule {
  date: string;
  start_time: string;
  start_period: "AM" | "PM";
  number_of_slots: number;
  slot_duration: number;
  breakTimes: SlotBreakTime[];
}

/* ================= MAIN COMPONENT ================= */
export default function ServiceDetails() {
  const { serviceId } = useParams();
  const router = useRouter();

  const [service, setService] = useState<Service | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [breakTimes, setBreakTimes] = useState<
    { start: string; end: string }[]
  >([{ start: "", end: "" }]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    ad_start_time: "",
    ad_end_time: "",
    price: "",
  });

  /* ================= BREAK TIMES ================= */
  const [slotSchedules, setSlotSchedules] = useState<SlotSchedule[]>([
    {
      date: "",
      start_time: "",
      start_period: "AM",
      number_of_slots: 1,
      slot_duration: 0,
      breakTimes: [{ start: "", end: "" }],
    },
  ]);

  /* ================= MORE SERVICES ================= */
  const [moreServices, setMoreServices] = useState<
    { service_name: string; price: string; duration: string }[]
  >([{ service_name: "", price: "", duration: "" }]);

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    setLoading(true);
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return router.push("/Login");

    const { data: serviceData } = await supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .single();

    const nowUTC = dayjs().utc().toISOString();

    const { data: adsData } = await supabase
      .from("ads")
      .select("*")
      .eq("service_id", serviceId)
      .lte("ad_start_time", nowUTC)
      .gte("ad_end_time", nowUTC)
      .order("created_at", { ascending: false });

    setService(serviceData);
    setAds(adsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [serviceId]);

  /* ================= IMAGE UPLOAD ================= */
  const uploadBanner = async () => {
    if (!bannerFile) return null;

    const fileName = `ad-${Date.now()}-${bannerFile.name}`;
    const { error } = await supabase.storage
      .from("ads-banners")
      .upload(fileName, bannerFile);

    if (error) {
      alert(error.message);
      return null;
    }

    const { data } = supabase.storage
      .from("ads-banners")
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  /* ================= CREATE ================= */
  const handleCreate = async () => {
    const banner_url = await uploadBanner();
    const user = (await supabase.auth.getUser()).data.user;

    const { data: ad, error } = await supabase
      .from("ads")
      .insert({
        service_id: serviceId,
        provider_id: user?.id,
        title: form.title,
        description: form.description,
        category: service?.category,
        district: service?.district,
        city: service?.city,
        ad_start_time: dayjs
          .tz(form.ad_start_time, "Asia/Colombo")
          .utc()
          .toISOString(),

        ad_end_time: dayjs
          .tz(form.ad_end_time, "Asia/Colombo")
          .utc()
          .toISOString(),

        price: Number(form.price) || 0,
        banner_url,
        status: "active",
      })
      .select()
      .single();

    if (ad) {
      for (const slot of slotSchedules) {
        const { data: slotRow } = await supabase
          .from("ad_slot_schedules")
          .insert({
            ad_id: ad.id,
            slot_date: slot.date,
            slot_start_time: slot.start_time,
            start_period: slot.start_period,
            slot_duration: slot.slot_duration,
            number_of_slots: slot.number_of_slots,
          })
          .select()
          .single();

        if (slotRow) {
          await supabase.from("ad_slot_break_times").insert(
            slot.breakTimes
              .filter((b) => b.start && b.end)
              .map((b) => ({
                slot_schedule_id: slotRow.id,
                break_start: b.start,
                break_end: b.end,
              }))
          );
        }
      }
    }
    reset();
    fetchData();
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!selectedAd) return;

    const banner_url = bannerFile
      ? await uploadBanner()
      : selectedAd.banner_url;

    const { error } = await supabase
      .from("ads")
      .update({
        title: form.title,
        description: form.description,
        ad_start_time: dayjs
          .tz(form.ad_start_time, "Asia/Colombo")
          .utc()
          .toISOString(),
        ad_end_time: dayjs
          .tz(form.ad_end_time, "Asia/Colombo")
          .utc()
          .toISOString(),
        price: Number(form.price) || 0,
        banner_url,
      })
      .eq("id", selectedAd.id);

    if (error) {
      alert(error.message);
      return;
    }

    // Update extra services
    await supabase.from("ad_services").delete().eq("ad_id", selectedAd.id);

    if (moreServices.length > 0) {
      await supabase.from("ad_services").insert(
        moreServices
          .filter((s) => s.service_name)
          .map((s) => ({
            ad_id: selectedAd.id,
            service_name: s.service_name,
            price: Number(s.price),
            duration: Number(s.duration),
          }))
      );
    }

    // Remove old schedules
    await supabase
      .from("ad_slot_schedules")
      .delete()
      .eq("ad_id", selectedAd.id);

    // Re-insert updated schedules
    for (const slot of slotSchedules) {
      const { data: slotRow } = await supabase
        .from("ad_slot_schedules")
        .insert({
          ad_id: selectedAd.id,
          slot_date: slot.date,
          slot_start_time: slot.start_time,
          start_period: slot.start_period,
          slot_duration: slot.slot_duration,
          number_of_slots: slot.number_of_slots,
        })
        .select()
        .single();

      if (slotRow) {
        await supabase.from("ad_slot_break_times").insert(
          slot.breakTimes
            .filter((b) => b.start && b.end)
            .map((b) => ({
              slot_schedule_id: slotRow.id,
              break_start: b.start,
              break_end: b.end,
            }))
        );
      }
    }

    reset();
    fetchData();
  };

  /* ================= DELETE ================= */
  const handleDelete = async (ad: Ad) => {
    if (!confirm("Delete this ad?")) return;

    if (ad.banner_url) {
      const path = ad.banner_url.split("/ads-banners/")[1];
      await supabase.storage.from("ads-banners").remove([path]);
    }

    await supabase.from("ads").delete().eq("id", ad.id);
    fetchData();
  };

  const reset = () => {
    setShowAdd(false);
    setShowEdit(false);
    setSelectedAd(null);
    setBannerFile(null);

    setForm({
      title: "",
      description: "",
      ad_start_time: "",
      ad_end_time: "",
      price: "",
    });

    setSlotSchedules([
      {
        date: "",
        start_time: "",
        start_period: "AM",
        number_of_slots: 1,
        slot_duration: 0,
        breakTimes: [{ start: "", end: "" }],
      },
    ]);

    setMoreServices([{ service_name: "", price: "", duration: "" }]);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  /* ================= RENDER ================= */
  return (
    <div className="max-w-6xl mx-auto p-6">
      <img
        src={categoryImages[service?.category || ""] || ""}
        className="w-full h-64 object-cover rounded mb-6"
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{service?.service_name}</h1>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          + New Ad
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="border rounded shadow">
            {ad.banner_url && (
              <img src={ad.banner_url} className="h-40 w-full object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-bold">{ad.title}</h3>
              <p>{ad.description}</p>
              <p className="text-sm mt-1">Price: Rs {ad.price}</p>
              <p className="text-sm">
                Slot Duration: {ad.slot_duration} minutes
              </p>
              <p className="text-sm">
                Ad Time:{" "}
                {dayjs(ad.ad_start_time)
                  .tz("Asia/Colombo")
                  .format("YYYY-MM-DD hh:mm A")}
                {" → "}
                {dayjs(ad.ad_end_time)
                  .tz("Asia/Colombo")
                  .format("YYYY-MM-DD hh:mm A")}
              </p>

              <p className="text-sm">Slot Start: {ad.slot_start_time}</p>
              <p className="text-sm">Number of Slots: {ad.number_of_slots}</p>

              <div className="flex gap-2 mt-3">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={async () => {
                    setSelectedAd(ad);

                    setForm({
                      title: ad.title,
                      description: ad.description,
                      ad_start_time: dayjs(ad.ad_start_time)
                        .tz("Asia/Colombo")
                        .format("YYYY-MM-DDTHH:mm"),

                      ad_end_time: dayjs(ad.ad_end_time)
                        .tz("Asia/Colombo")
                        .format("YYYY-MM-DDTHH:mm"),

                      price: ad.price.toString(),
                    });

                    // ✅ LOAD EXISTING SERVICES
                    const { data } = await supabase
                      .from("ad_services")
                      .select("service_name, price, duration")
                      .eq("ad_id", ad.id);

                    setMoreServices(
                      data && data.length > 0
                        ? data.map((s) => ({
                            service_name: s.service_name,
                            price: s.price.toString(),
                            duration: s.duration.toString(),
                          }))
                        : [{ service_name: "", price: "", duration: "" }]
                    );

                    // LOAD BREAK TIMES
                    const { data: breaks } = await supabase
                      .from("ad_break_times")
                      .select("break_start, break_end")
                      .eq("ad_id", ad.id);

                    setBreakTimes(
                      breaks && breaks.length > 0
                        ? breaks.map((b) => ({
                            start: b.break_start,
                            end: b.break_end,
                          }))
                        : [{ start: "", end: "" }]
                    );

                    setShowEdit(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(ad)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(showAdd || showEdit) && (
        <Modal
          title={showAdd ? "New Advertisement" : "Edit Advertisement"}
          form={form}
          setForm={setForm}
          setBannerFile={setBannerFile}
          category={service?.category || ""}
          onClose={reset}
          onSave={showAdd ? handleCreate : handleUpdate}
          moreServices={moreServices}
          setMoreServices={setMoreServices}
          slotSchedules={slotSchedules}
          setSlotSchedules={setSlotSchedules}
        />
      )}
    </div>
  );
}

/* ================= MODAL COMPONENT ================= */
interface ModalProps {
  title: string;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  setBannerFile: React.Dispatch<React.SetStateAction<File | null>>;
  category: string;
  onClose: () => void;
  onSave: () => void;

  moreServices: { service_name: string; price: string; duration: string }[];
  setMoreServices: React.Dispatch<
    React.SetStateAction<
      { service_name: string; price: string; duration: string }[]
    >
  >;

  slotSchedules: SlotSchedule[];
  setSlotSchedules: React.Dispatch<React.SetStateAction<SlotSchedule[]>>;
}

function Modal({
  title,
  form,
  setForm,
  setBannerFile,
  category,
  onClose,
  onSave,
  moreServices,
  setMoreServices,
  slotSchedules,
  setSlotSchedules,
}: ModalProps) {
  // ==============================
  // 1️⃣ TIME → MINUTES
  // ==============================
  const timeToMinutes = (time: string, period: string) => {
    if (!time) return 0;

    const [h, m] = time.split(":").map(Number);
    let hours = h;

    if (period === "PM" && h !== 12) hours += 12;
    if (period === "AM" && h === 12) hours = 0;

    return hours * 60 + m;
  };

  // ==============================
  // 3️⃣ SLOT END CALCULATION (CORRECT)
  // ==============================
  const calculateSlotEndTime = (slot: any) => {
    if (!slot.start_time || !slot.slot_duration || !slot.number_of_slots) {
      return "";
    }

    let currentTime = timeToMinutes(slot.start_time, slot.start_period);
    let createdSlots = 0;

    while (createdSlots < slot.number_of_slots) {
      const activeBreak = slot.breakTimes.find((b: any) => {
        if (!b.start || !b.end) return false;

        const start = timeToMinutes(b.start, slot.start_period);
        const end = timeToMinutes(b.end, slot.start_period);

        return currentTime >= start && currentTime < end;
      });

      // ⏭ Skip break
      if (activeBreak) {
        currentTime = timeToMinutes(activeBreak.end, slot.start_period);
        continue;
      }

      // ✅ Create slot
      currentTime += slot.slot_duration;
      createdSlots++;
    }

    const hours = Math.floor(currentTime / 60);
    const minutes = currentTime % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;

    return `${displayHour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-[450px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <label>Title</label>
        <input
          className="input w-full mb-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <label>Category</label>
        <input className="input w-full mb-2" value={category} disabled />

        <label>Description</label>
        <textarea
          className="textarea w-full mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label>Ad Banner</label>
        <input
          type="file"
          className="mb-2"
          onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
        />

        <label>AD Start Time</label>
        <input
          type="datetime-local"
          className="input w-full mb-2"
          value={form.ad_start_time}
          onChange={(e) => setForm({ ...form, ad_start_time: e.target.value })}
        />

        <label>AD End Time</label>
        <input
          type="datetime-local"
          className="input w-full mb-2"
          value={form.ad_end_time}
          onChange={(e) => setForm({ ...form, ad_end_time: e.target.value })}
        />

        <h3 className="font-semibold mt-4 mb-2">Slot Schedules</h3>

        {slotSchedules.map((slot, index) => (
          <div key={index} className="border rounded p-3 mb-4">
            {/* Slot Date */}
            <label>Slot Date</label>
            <input
              type="date"
              className="input w-full mb-2"
              value={slot.date}
              onChange={(e) => {
                const copy = [...slotSchedules];
                copy[index].date = e.target.value;
                setSlotSchedules(copy);
              }}
            />

            {/* Slot Start Time */}
            <label>Slot Start time</label>
            <div className="flex gap-2 mb-2">
              <input
                type="time"
                className="input w-full"
                value={slot.start_time}
                onChange={(e) => {
                  const copy = [...slotSchedules];
                  copy[index].start_time = e.target.value;
                  setSlotSchedules(copy);
                }}
              />
            </div>

            {/* Number of Slots */}
            <label>Number of Slots</label>
            <input
              type="number"
              className="input w-full mb-2"
              placeholder="Number of Slots"
              value={slot.number_of_slots}
              onChange={(e) => {
                const copy = [...slotSchedules];
                copy[index].number_of_slots = Number(e.target.value);
                setSlotSchedules(copy);
              }}
            />

            {/* Slot Duration */}
            <label>Slot Duration (minutes)</label>
            <input
              type="number"
              className="input w-full mb-2"
              placeholder="Slot Duration (minutes)"
              value={slot.slot_duration}
              onChange={(e) => {
                const copy = [...slotSchedules];
                copy[index].slot_duration = Number(e.target.value);
                setSlotSchedules(copy);
              }}
            />

            {/* Break Times */}
            <label className="font-semibold">Break Times</label>

            {slot.breakTimes.map((b, bIndex) => (
              <div key={bIndex} className="flex gap-2 mb-2">
                <input
                  type="time"
                  className="input w-full"
                  value={b.start}
                  onChange={(e) => {
                    const copy = [...slotSchedules];
                    copy[index].breakTimes[bIndex].start = e.target.value;
                    setSlotSchedules(copy);
                  }}
                />
                <input
                  type="time"
                  className="input w-full"
                  value={b.end}
                  onChange={(e) => {
                    const copy = [...slotSchedules];
                    copy[index].breakTimes[bIndex].end = e.target.value;
                    setSlotSchedules(copy);
                  }}
                />
              </div>
            ))}

            <button
              className="btn btn-outline btn-sm w-full"
              onClick={() => {
                const copy = [...slotSchedules];
                copy[index].breakTimes.push({ start: "", end: "" });
                setSlotSchedules(copy);
              }}
            >
              + Add Break Time
            </button>

            {calculateSlotEndTime(slot) && (
              <p className="text-sm text-gray-600 mt-2">
                Slot End Time:
                <span className="font-semibold ml-1">
                  {calculateSlotEndTime(slot)}
                </span>
              </p>
            )}
          </div>
        ))}

        {/* ➕ ADD ANOTHER DAY */}
        <button
          className="btn btn-primary w-full"
          onClick={() =>
            setSlotSchedules([
              ...slotSchedules,
              {
                date: "",
                start_time: "",
                start_period: "AM",
                number_of_slots: 1,
                slot_duration: 0,
                breakTimes: [{ start: "", end: "" }],
              },
            ])
          }
        >
          + Add Slot for Another Day
        </button>

        <label>Price (Rs)</label>
        <input
          type="number"
          className="input w-full mb-4"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <hr className="my-4" />
        <h3 className="font-semibold mb-2">More Services</h3>

        {moreServices.map((s, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 mb-2">
            <input
              className="input input-sm"
              placeholder="Service Name"
              value={s.service_name}
              onChange={(e) => {
                const copy = [...moreServices];
                copy[index].service_name = e.target.value;
                setMoreServices(copy);
              }}
            />
            <input
              type="number"
              className="input input-sm"
              placeholder="Price"
              value={s.price}
              onChange={(e) => {
                const copy = [...moreServices];
                copy[index].price = e.target.value;
                setMoreServices(copy);
              }}
            />
            <input
              type="number"
              className="input input-sm"
              placeholder="Duration (min)"
              value={s.duration}
              onChange={(e) => {
                const copy = [...moreServices];
                copy[index].duration = e.target.value;
                setMoreServices(copy);
              }}
            />
          </div>
        ))}

        <button
          className="btn btn-outline w-full mb-4"
          onClick={() =>
            setMoreServices([
              ...moreServices,
              { service_name: "", price: "", duration: "" },
            ])
          }
        >
          + Add More Services
        </button>

        <div className="flex justify-end gap-4">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
