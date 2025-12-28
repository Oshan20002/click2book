"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

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

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    price: "",
    slot_duration: "",
  });

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
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
  }, []);

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

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ads-banners/${fileName}`;
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
      category: service.category,
      start_time: form.start_time,
      end_time: form.end_time,
      price: Number(form.price),
      slot_duration: Number(form.slot_duration),
      banner_url,
      status: "active",
    });

    reset();
    fetchData();
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    const banner_url = bannerFile
      ? await uploadBanner()
      : selectedAd.banner_url;

    await supabase
      .from("ads")
      .update({
        ...form,
        price: Number(form.price),
        slot_duration: Number(form.slot_duration),
        banner_url,
      })
      .eq("id", selectedAd.id);

    reset();
    fetchData();
  };

  /* ================= DELETE ================= */
  const handleDelete = async (ad: any) => {
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
      start_time: "",
      end_time: "",
      price: "",
      slot_duration: "",
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <img
        src={categoryImages[service.category]}
        className="w-full h-64 object-cover rounded mb-6"
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{service.service_name}</h1>
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
                {ad.start_time} → {ad.end_time}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => {
                    setSelectedAd(ad);
                    setForm(ad);
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
          category={service.category}
          onClose={reset}
          onSave={showAdd ? handleCreate : handleUpdate}
        />
      )}
    </div>
  );
}

/* ================= MODAL ================= */
function Modal({
  title,
  form,
  setForm,
  setBannerFile,
  category,
  onClose,
  onSave,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-[450px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <input className="input w-full mb-2" placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />

        <input className="input w-full mb-2" value={category} disabled />

        <textarea className="textarea w-full mb-2" placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <input type="file" className="mb-2"
          onChange={(e) => setBannerFile(e.target.files?.[0])} />

        <input type="datetime-local" className="input w-full mb-2"
          value={form.start_time}
          onChange={(e) => setForm({ ...form, start_time: e.target.value })} />

        <input type="datetime-local" className="input w-full mb-2"
          value={form.end_time}
          onChange={(e) => setForm({ ...form, end_time: e.target.value })} />

        <input type="number" className="input w-full mb-2" placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })} />

        <input type="number" className="input w-full mb-4"
          placeholder="Slot duration (minutes)"
          value={form.slot_duration}
          onChange={(e) =>
            setForm({ ...form, slot_duration: e.target.value })
          } />

        <div className="flex justify-end gap-4">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
