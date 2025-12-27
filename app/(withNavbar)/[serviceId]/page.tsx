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

  const [showAddAd, setShowAddAd] = useState(false);
  const [showEditAd, setShowEditAd] = useState(false);

  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    price: "",
  });

  /* ================= FETCH ================= */
  const fetchData = async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return router.push("/Login");

    const { data: serviceData } = await supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .single();

    setService(serviceData);

    const { data: adsData } = await supabase
      .from("ads")
      .select("*")
      .eq("service_id", serviceId)
      .order("created_at", { ascending: false });

    setAds(adsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= UPLOAD IMAGE ================= */
  const uploadBanner = async (): Promise<string | null> => {
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

  /* ================= CREATE AD ================= */
  const handleCreateAd = async () => {
    const bannerUrl = await uploadBanner();

    await supabase.from("ads").insert({
      service_id: serviceId,
      provider_id: (await supabase.auth.getUser()).data.user?.id,
      title: form.title,
      category: service.category,
      description: form.description,
      start_time: form.start_time,
      end_time: form.end_time,
      price: Number(form.price),
      banner_url: bannerUrl,
      status: "active",
    });

    setShowAddAd(false);
    setBannerFile(null);
    setForm({ title: "", description: "", start_time: "", end_time: "", price: "" });
    fetchData();
  };

  /* ================= UPDATE AD ================= */
  const handleUpdateAd = async () => {
    const bannerUrl = bannerFile ? await uploadBanner() : selectedAd.banner_url;

    await supabase
      .from("ads")
      .update({
        title: form.title,
        description: form.description,
        start_time: form.start_time,
        end_time: form.end_time,
        price: Number(form.price),
        banner_url: bannerUrl,
      })
      .eq("id", selectedAd.id);

    setShowEditAd(false);
    setSelectedAd(null);
    fetchData();
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 border rounded-md shadow-md">
      <img src={categoryImages[service.category]} className="w-full h-64 object-cover rounded mb-6" />

      <h1 className="text-2xl font-bold">{service.service_name}</h1>

      <button className="btn btn-primary my-6" onClick={() => setShowAddAd(true)}>
        Put New Ad
      </button>

      <h2 className="text-xl font-semibold mb-4">Current Ads</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="border rounded shadow">
            {ad.banner_url && (
              <img src={ad.banner_url} className="h-40 w-full object-cover rounded-t" />
            )}
            <div className="p-4">
              <h3 className="font-bold">{ad.title}</h3>
              <p>{ad.description}</p>
              <button
                className="btn btn-sm btn-outline mt-2"
                onClick={() => {
                  setSelectedAd(ad);
                  setForm(ad);
                  setShowEditAd(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      {showAddAd && (
        <Modal
          title="New Ad"
          onClose={() => setShowAddAd(false)}
          onSave={handleCreateAd}
          setForm={setForm}
          setBannerFile={setBannerFile}
          service={service}
        />
      )}

      {/* EDIT MODAL */}
      {showEditAd && (
        <Modal
          title="Edit Ad"
          onClose={() => setShowEditAd(false)}
          onSave={handleUpdateAd}
          setForm={setForm}
          setBannerFile={setBannerFile}
          service={service}
        />
      )}
    </div>
  );
}

/* ================= MODAL COMPONENT ================= */
function Modal({ title, onClose, onSave, setForm, setBannerFile, service }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[450px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <input className="input w-full mb-2" placeholder="Title" onChange={(e) => setForm((p:any)=>({...p,title:e.target.value}))}/>
        <input className="input w-full mb-2" value={service.category} disabled />
        <textarea className="textarea w-full mb-2" placeholder="Description" onChange={(e)=>setForm((p:any)=>({...p,description:e.target.value}))}/>
        <input type="file" className="mb-2" onChange={(e)=>setBannerFile(e.target.files?.[0])}/>
        <input type="datetime-local" className="input w-full mb-2" onChange={(e)=>setForm((p:any)=>({...p,start_time:e.target.value}))}/>
        <input type="datetime-local" className="input w-full mb-2" onChange={(e)=>setForm((p:any)=>({...p,end_time:e.target.value}))}/>
        <input type="number" className="input w-full mb-4" placeholder="Price" onChange={(e)=>setForm((p:any)=>({...p,price:e.target.value}))}/>

        <div className="flex justify-end gap-4">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
