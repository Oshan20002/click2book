"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

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
}

interface Ad {
  id: string;
  title: string;
  description: string;
  ad_start_time: string;
  ad_end_time: string;
  slot_start_time: string;
  slot_duration: number;
  number_of_slots: number;
  price: number;
  banner_url?: string;
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

  const [form, setForm] = useState({
    title: "",
    description: "",
    ad_start_time: "",
    ad_end_time: "",
    slot_start_time: "",
    start_period: "AM",
    slot_duration: "",
    number_of_slots: 1,
    price: "",
  });

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

    const { data: adsData } = await supabase
      .from("ads")
      .select("*")
      .eq("service_id", serviceId)
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
    const { error } = await supabase.storage.from("ads-banners").upload(fileName, bannerFile);

    if (error) {
      alert(error.message);
      return null;
    }

    const { data } = supabase.storage.from("ads-banners").getPublicUrl(fileName);
    return data.publicUrl;
  };

  /* ================= CREATE ================= */
  const handleCreate = async () => {
    const banner_url = await uploadBanner();
    const user = (await supabase.auth.getUser()).data.user;

    await supabase.from("ads").insert({
      service_id: serviceId,
      provider_id: user?.id,
      title: form.title,
      description: form.description,
      category: service?.category,
      ad_start_time: form.ad_start_time,
      ad_end_time: form.ad_end_time,
      slot_start_time: `${form.slot_start_time} ${form.start_period}`,
      slot_duration: Number(form.slot_duration) || 0,
      number_of_slots: Number(form.number_of_slots) || 1,
      price: Number(form.price) || 0,
      banner_url,
      status: "active",
    });

    reset();
    fetchData();
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    const banner_url = bannerFile ? await uploadBanner() : selectedAd?.banner_url;

    await supabase.from("ads").update({
      title: form.title,
      description: form.description,
      ad_start_time: form.ad_start_time,
      ad_end_time: form.ad_end_time,
      slot_start_time: `${form.slot_start_time} ${form.start_period}`,
      slot_duration: Number(form.slot_duration) || 0,
      number_of_slots: Number(form.number_of_slots) || 1,
      price: Number(form.price) || 0,
      banner_url,
    }).eq("id", selectedAd?.id);

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
      slot_start_time: "",
      start_period: "AM",
      slot_duration: "",
      number_of_slots: 1,
      price: "",
    });
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
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ New Ad</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="border rounded shadow">
            {ad.banner_url && <img src={ad.banner_url} className="h-40 w-full object-cover" />}
            <div className="p-4">
              <h3 className="font-bold">{ad.title}</h3>
              <p>{ad.description}</p>
              <p className="text-sm mt-1">Price: Rs {ad.price}</p>
              <p className="text-sm">Slot Duration: {ad.slot_duration} minutes</p>
              <p className="text-sm">Ad Time: {ad.ad_start_time} → {ad.ad_end_time}</p>
              <p className="text-sm">Slot Start: {ad.slot_start_time}</p>
              <p className="text-sm">Number of Slots: {ad.number_of_slots}</p>

              <div className="flex gap-2 mt-3">
                <button className="btn btn-sm btn-outline"
                  onClick={() => {
                    setSelectedAd(ad);
                    setForm({
                      ...ad,
                      start_period: ad.slot_start_time.split(" ")[1] || "AM",
                      slot_duration: ad.slot_duration.toString(),
                      price: ad.price.toString(),
                    });
                    setShowEdit(true);
                  }}>
                  Edit
                </button>
                <button className="btn btn-sm btn-error" onClick={() => handleDelete(ad)}>Delete</button>
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
}

function Modal({ title, form, setForm, setBannerFile, category, onClose, onSave }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-[450px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <label>Title</label>
        <input className="input w-full mb-2" placeholder="Title"
          value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />

        <label>Category</label>
        <input className="input w-full mb-2" value={category} disabled />

        <label>Description</label>
        <textarea className="textarea w-full mb-2" placeholder="Description"
          value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />

        <label>Ad Banner</label>
        <input type="file" className="mb-2" onChange={(e) => setBannerFile(e.target.files?.[0] || null)} />

        <label>AD Start Time</label>
        <input type="datetime-local" className="input w-full mb-2"
          value={form.ad_start_time} onChange={(e) => setForm({...form, ad_start_time: e.target.value})} />

        <label>AD End Time</label>
        <input type="datetime-local" className="input w-full mb-2"
          value={form.ad_end_time} onChange={(e) => setForm({...form, ad_end_time: e.target.value})} />

        <label>Slot Start Time</label>
        <div className="flex gap-2 mb-2">
          <input type="time" className="input w-32"
            value={form.slot_start_time} onChange={(e) => setForm({...form, slot_start_time: e.target.value})} />
          <select className="input w-24"
            value={form.start_period} onChange={(e) => setForm({...form, start_period: e.target.value})}>
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>

        <label>Number of Slots</label>
        <input type="number" min={1} className="input w-full mb-2"
          value={form.number_of_slots} onChange={(e) => setForm({...form, number_of_slots: Number(e.target.value)})} />

        <label>Slot Duration (minutes)</label>
        <input type="number" className="input w-full mb-2"
          value={form.slot_duration} onChange={(e) => setForm({...form, slot_duration: e.target.value})} />

        <label>Price (Rs)</label>
        <input type="number" className="input w-full mb-4"
          value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />

        <div className="flex justify-end gap-4">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
