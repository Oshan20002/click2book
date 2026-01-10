"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterService() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState("");

  const DISTRICTS = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Galle",
    "Matara",
    "Hambantota",
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Mullaitivu",
    "Vavuniya",
    "Trincomalee",
    "Batticaloa",
    "Ampara",
    "Kurunegala",
    "Puttalam",
    "Anuradhapura",
    "Polonnaruwa",
    "Badulla",
    "Monaragala",
    "Ratnapura",
    "Kegalle",
  ];

  const CITIES = [
    "Akkaraipattu",
    "Akuressa",
    "Aluthgama",
    "Ambalangoda",
    "Ambepussa",
    "Ampara",
    "Anuradhapura",
    "Aralaganwila",
    "Avissawella",
    "Baddegama",
    "Badulla",
    "Balangoda",
    "Bandaragama",
    "Bandarawela",
    "Batticaloa",
    "Beliatta",
    "Beruwala",
    "Bibile",
    "Chavakachcheri",
    "Chilaw",
    "Colombo",
    "Dambulla",
    "Dankotuwa",
    "Dehiattakandiya",
    "Dehiwala–Mount Lavinia",
    "Delgoda",
    "Deniyaya",
    "Deraniyagala",
    "Divulapitiya",
    "Embilipitiya",
    "Eppawala",
    "Galle",
    "Gampaha",
    "Gampola",
    "Girandurukotte",
    "Hambantota",
    "Haputale",
    "Hatton",
    "Hikkaduwa",
    "Hokandara",
    "Homagama",
    "Horana",
    "Ingiriya",
    "Ja-Ela",
    "Jaffna",
    "Kadawatha",
    "Kaduwela",
    "Kalawana",
    "Kalmunai",
    "Kalpitiya",
    "Kalutara",
    "Kandy",
    "Kantale",
    "Karaitivu",
    "Kattankudy",
    "Kegalle",
    "Kelaniya",
    "Kesbewa",
    "Kilinochchi",
    "Kiribathgoda",
    "Kochchikade",
    "Koggala",
    "Kolonnawa",
    "Kotahena",
    "Kuliyapitiya",
    "Kurunegala",
    "Maho",
    "Maharagama",
    "Mahiyanganaya",
    "Malabe",
    "Mannar",
    "Marawila",
    "Matale",
    "Matara",
    "Mawanella",
    "Medawachchiya",
    "Minuwangoda",
    "Mirigama",
    "Monaragala",
    "Moratuwa",
    "Mullaitivu",
    "Nattandiya",
    "Nawalapitiya",
    "Negombo",
    "Nochchiyagama",
    "Nuwara Eliya",
    "Padaviya",
    "Panadura",
    "Pelmadulla",
    "Pilimathalawa",
    "Point Pedro",
    "Polgahawela",
    "Polonnaruwa",
    "Puttalam",
    "Ragama",
    "Ratnapura",
    "Seeduwa",
    "Siyambalanduwa",
    "Talawakele",
    "Tangalle",
    "Thalawathugoda",
    "Thambuttegama",
    "Tissamaharama",
    "Trincomalee",
    "Udugama",
    "Valaichchenai",
    "Vavuniya",
    "Wadduwa",
    "Wattala",
    "Weligama",
    "Welimada",
    "Wennappuwa",
  ];

  const [form, setForm] = useState({
    service_name: "",
    description: "",
    category: "",
    district: "",
    city: "",
    map_url: "",
  });

  const [cityQuery, setCityQuery] = useState("");

  // 🔐 Auth + Provider Role Check
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/Login");
        return;
      }

      setUser(data.user);

      const { data: profileData } = await supabase
        .from("users")
        .select("id, role")
        .eq("id", data.user.id)
        .single();

      if (!profileData || profileData.role !== "provider") {
        router.push("/");
        return;
      }

      setProfile(profileData);
      setLoading(false);
    };

    init();
  }, [router]);

  // 📤 Submit Service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.from("services").insert({
      provider_id: user.id,
      service_name: form.service_name,
      description: form.description,
      category: form.category,
      district: form.district,
      city: form.city,
      map_url: form.map_url,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/ProviderDashbord");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register New Service</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Service Name"
          className="input input-bordered w-full"
          value={form.service_name}
          onChange={(e) => setForm({ ...form, service_name: e.target.value })}
          required
        />

        <textarea
          placeholder="Service Description"
          className="textarea textarea-bordered w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <select
          className="select select-bordered w-full"
          value={form.district}
          onChange={(e) =>
            setForm({ ...form, district: e.target.value, city: "" })
          }
          required
        >
          <option value="" disabled>
            Select District
          </option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <div className="relative">
          <input
            type="text"
            placeholder="Search City"
            className="input input-bordered w-full"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              setForm({ ...form, city: "" });
            }}
            disabled={!form.district}
            required
          />

          {cityQuery && (
            <ul className="absolute z-10 bg-base-100 border rounded w-full max-h-48 overflow-y-auto">
              {CITIES.filter((city) =>
                city.toLowerCase().startsWith(cityQuery.toLowerCase())
              ).map((city) => (
                <li
                  key={city}
                  className="px-3 py-2 hover:bg-base-200 cursor-pointer"
                  onClick={() => {
                    setForm({ ...form, city });
                    setCityQuery(city);
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="url"
          placeholder="Google Maps URL"
          className="input input-bordered w-full"
          value={form.map_url}
          onChange={(e) => setForm({ ...form, map_url: e.target.value })}
          required
        />

        <select
          className="select select-bordered w-full"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="" disabled>
            Select Service Category
          </option>
          <option value="Home Services">Home Services</option>
          <option value="Beauty & Wellness">Beauty & Wellness</option>
          <option value="Automotive">Automotive</option>
          <option value="Education & Tutoring">Education & Tutoring</option>
          <option value="Events & Entertainment">Events & Entertainment</option>
          <option value="Health & Medical">Health & Medical</option>
          <option value="Technology & IT">Technology & IT</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Register Service
        </button>
      </form>
    </div>
  );
}
