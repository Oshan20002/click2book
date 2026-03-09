"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";


// Districts & Cities for selection
const DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Mullaitivu", "Vavuniya", "Trincomalee", "Batticaloa", "Ampara",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle",
];

const CITIES = [
  "Akkaraipattu","Akuressa","Aluthgama","Ambalangoda","Ambepussa","Ampara",
  "Anuradhapura","Aralaganwila","Avissawella","Baddegama","Badulla","Balangoda",
  "Bandaragama","Bandarawela","Batticaloa","Beliatta","Beruwala","Bibile",
  "Chavakachcheri","Chilaw","Colombo","Dambulla","Dankotuwa","Dehiattakandiya",
  "Dehiwala–Mount Lavinia","Delgoda","Deniyaya","Deraniyagala","Divulapitiya",
  "Embilipitiya","Eppawala","Galle","Gampaha","Gampola","Girandurukotte",
  "Hambantota","Haputale","Hatton","Hikkaduwa","Hokandara","Homagama","Horana",
  "Ingiriya","Ja-Ela","Jaffna","Kadawatha","Kaduwela","Kalawana","Kalmunai",
  "Kalpitiya","Kalutara","Kandy","Kantale","Karaitivu","Kattankudy","Kegalle",
  "Kelaniya","Kesbewa","Kilinochchi","Kiribathgoda","Kochchikade","Koggala",
  "Kolonnawa","Kotahena","Kuliyapitiya","Kurunegala","Maho","Maharagama",
  "Mahiyanganaya","Malabe","Mannar","Marawila","Matale","Matara","Mawanella",
  "Medawachchiya","Minuwangoda","Mirigama","Monaragala","Moratuwa","Mullaitivu",
  "Nattandiya","Nawalapitiya","Negombo","Nochchiyagama","Nuwara Eliya","Padaviya",
  "Panadura","Pelmadulla","Pilimathalawa","Point Pedro","Polgahawela","Polonnaruwa",
  "Puttalam","Ragama","Ratnapura","Seeduwa","Siyambalanduwa","Talawakele",
  "Tangalle","Thalawathugoda","Thambuttegama","Tissamaharama","Trincomalee",
  "Udugama","Valaichchenai","Vavuniya","Wadduwa","Wattala","Weligama","Welimada","Wennappuwa",
];


// Main component for service registration page
export default function RegisterService() {
  const router = useRouter();
  const { user, loading, hasRole } = useAuth();

  // Submission loading
  const [submitting, setSubmitting] = useState(false);
  // Error messages
  const [error, setError] = useState("");

  // Form state for service details
  const [form, setForm] = useState({
    service_name: "", description: "", category: "", district: "", city: "", map_url: "",
  });

  // Input for city search
  const [cityQuery, setCityQuery] = useState("");

  // Auth guard
  useEffect(() => {
    if (loading) return;

    //redirect non-providers or unauthenticated users
    if (!user) { router.push("/Login"); return; }
    
    // redirect to home if not a provider
    if (!hasRole("provider")) { router.push("/"); return; }
  }, [user, loading, hasRole, router]);


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!user) return;

    // Intert new service into database
    try {
      setSubmitting(true);
      const { error: insertError } = await supabase.from("services").insert({
        provider_id: user.id,
        service_name: form.service_name,
        description: form.description,
        category: form.category,
        district: form.district,
        city: form.city,
        map_url: form.map_url,
      });

      if (insertError) { setError(insertError.message); return; }
      router.push("/ProviderDashbord"); // Redirect after success
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading spinner while auth context is initializing
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register New Service</h1>

      {error && (
        <div className="alert alert-error mb-3 text-sm"><span>{error}</span></div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Service Name" className="input input-bordered w-full"
          value={form.service_name} onChange={(e) => setForm({ ...form, service_name: e.target.value })} required />

        <textarea placeholder="Service Description" className="textarea textarea-bordered w-full"
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />

        <select className="select select-bordered w-full" value={form.district}
          onChange={(e) => setForm({ ...form, district: e.target.value, city: "" })} required>
          <option value="" disabled>Select District</option>
          {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <div className="relative">
          <input type="text" placeholder="Search City" className="input input-bordered w-full"
            value={cityQuery}
            onChange={(e) => { setCityQuery(e.target.value); setForm({ ...form, city: "" }); }}
            disabled={!form.district} required />
          {cityQuery && !form.city && (
            <ul className="absolute z-10 bg-base-100 border rounded w-full max-h-48 overflow-y-auto">
              {CITIES.filter((c) => c.toLowerCase().startsWith(cityQuery.toLowerCase())).map((city) => (
                <li key={city} className="px-3 py-2 hover:bg-base-200 cursor-pointer"
                  onClick={() => { setForm({ ...form, city }); setCityQuery(city); }}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input type="url" placeholder="Google Maps URL" className="input input-bordered w-full"
          value={form.map_url} onChange={(e) => setForm({ ...form, map_url: e.target.value })} required />

        <select className="select select-bordered w-full" value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })} required>
          <option value="" disabled>Select Service Category</option>
          <option value="Home Services">Home Services</option>
          <option value="Beauty & Wellness">Beauty &amp; Wellness</option>
          <option value="Education & Tutoring">Education &amp; Tutoring</option>
          <option value="Pet & Animals">Pet &amp; Animals</option>
          <option value="Health & Medical">Health &amp; Medical</option>
          <option value="Technology & IT">Technology &amp; IT</option>
        </select>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? <span className="loading loading-spinner loading-sm" /> : "Register Service"}
        </button>
      </form>
    </div>
  );
}