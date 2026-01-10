"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

const KEYWORDS = [
  // 🏥 Health Care
  { keyword: "Doctor", category: "Health Care" },
  { keyword: "Clinic", category: "Health Care" },
  { keyword: "Dental", category: "Health Care" },
  { keyword: "Physiotherapy", category: "Health Care" },
  { keyword: "Mental health counseling", category: "Health Care" },
  { keyword: "Ayurveda treatment", category: "Health Care" },

  // 🎓 Education
  { keyword: "Tutor", category: "Education" },
  { keyword: "Tuition", category: "Education" },
  { keyword: "Schooling", category: "Education" },
  { keyword: "STEM", category: "Education" },
  { keyword: "Coding", category: "Education" },
  { keyword: "IELTS classes", category: "Education" },
  { keyword: "Programming courses", category: "Education" },

  // 💇‍♀️ Beauty & Wellness
  { keyword: "Salon", category: "Beauty & Wellness" },
  { keyword: "Spa", category: "Beauty & Wellness" },
  { keyword: "Skincare", category: "Beauty & Wellness" },
  { keyword: "Bridal makeup", category: "Beauty & Wellness" },
  { keyword: "Massage therapy", category: "Beauty & Wellness" },
  { keyword: "Yoga instructor", category: "Beauty & Wellness" },

  // 🏠 Home Services
  { keyword: "Electrician", category: "Home Services" },
  { keyword: "Plumber", category: "Home Services" },
  { keyword: "House cleaning", category: "Home Services" },
  { keyword: "AC repair", category: "Home Services" },
  { keyword: "CCTV installation", category: "Home Services" },

  // 🐶 Pet & Animals
  { keyword: "Veterinary clinic", category: "Pet & Animals" },
  { keyword: "Pet grooming", category: "Pet & Animals" },
  { keyword: "Dog training", category: "Pet & Animals" },
  { keyword: "Pet boarding", category: "Pet & Animals" },

  // 💻 Technology
  { keyword: "Computer repair", category: "Technology" },
  { keyword: "Laptop repair", category: "Technology" },
  { keyword: "Servers", category: "Technology" },
  { keyword: "SEO", category: "Technology" },
  { keyword: "Web development", category: "Technology" },
];


export default function Home() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const keywordSuggestions = KEYWORDS.filter((k) =>
    k.keyword.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 8);


  const [keyword, setKeyword] = useState("");
  const [district, setDistrict] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [city, setCity] = useState("");

  const filteredCities = CITIES.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

const handleSearch = () => {
  const params = new URLSearchParams();

  if (search) params.append("q", search);
  if (selectedCategory) params.append("category", selectedCategory);
  if (district) params.append("district", district);
  if (city) params.append("city", city);

  router.push(`/ads?${params.toString()}`);
};


  const browseCategory = (category: string) => {
    router.push(`/ads?category=${encodeURIComponent(category)}`);
  };

  return (
<main className="bg-white">
  {/* Hero Section */}
  <div className="bg-blue-200 w-full min-h-screen px-6 py-16">
    <h1 className="text-6xl text-center font-bold mt-10">
      Book Any Service
    </h1>
    <h2 className="text-6xl text-center font-bold mt-5 text-slate-600">
      Anytime, Anywhere
    </h2>
    <p className="text-2xl text-center max-w-4xl mx-auto mt-8">
      Connect with trusted service providers across Sri Lanka.
    </p>

    <div className="max-w-5xl mx-auto mt-14 bg-white p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-4 gap-4 relative">
      {/* Service search */}
      <div className="relative">
        <input
          type="text"
          required
          placeholder="Search services (salon, tutor, plumber...)"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedCategory("");
          }}
        />

        {search && keywordSuggestions.length > 0 && (
          <ul className="absolute left-0 top-full z-50 bg-white border rounded-lg mt-1 w-full max-h-56 overflow-y-auto shadow-lg">
            {keywordSuggestions.map((item) => (
              <li
                key={item.keyword}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  setSearch(item.keyword);
                  setSelectedCategory(item.category);
                }}
              >
                <span className="font-medium">{item.keyword}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({item.category})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* District */}
      <select
        className="select select-bordered w-full"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      >
        <option value="">All Districts</option>
        {DISTRICTS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      {/* City */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search city (optional)"
          className="input input-bordered w-full"
          value={citySearch}
          onChange={(e) => {
            setCitySearch(e.target.value);
            setCity("");
          }}
        />

        {citySearch && (
          <ul className="absolute left-0 top-full z-40 bg-white border rounded-lg mt-1 max-h-48 overflow-y-auto w-full shadow-lg">
            {filteredCities.slice(0, 8).map((c) => (
              <li
                key={c}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  setCity(c);
                  setCitySearch(c);
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Button */}
      <button className="btn btn-primary w-full" onClick={handleSearch}>
        Search
      </button>
    </div>
  </div>



      {/* Browse by Category */}
      <section className="mt-20">
        <h2 className="text-center text-4xl font-bold">Browse by Category</h2>
        <p className="text-center mt-3">
          Find services posted by verified providers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 mt-12">
          {/* Health */}
          <CategoryCard
            title="Health Care"
            description="Doctors, Nurses, Physiotherapy"
            image="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/helthcare.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaGVsdGhjYXJlLmpwZyIsImlhdCI6MTc2MTI4OTc2MywiZXhwIjoxODQ3Njg5NzYzfQ.WwdqaHdjiC14uHeq8Lex7EZ_9NHOr6KnPq7nNLarxq4"
            onClick={() => browseCategory("Health & Medical")}
          />

          {/* Education */}
          <CategoryCard
            title="Education"
            description="Tutoring, Music, Languages"
            image="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/education.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvZWR1Y2F0aW9uLmpwZyIsImlhdCI6MTc2MTI5MDEzMSwiZXhwIjoxNzkyODI2MTMxfQ.4868g02rfwRGp9oh-pJz1iBS2LwCsd4Fyv-d5dCECLY"
            onClick={() => browseCategory("Education & Tutoring")}
          />

          {/* Beauty */}
          <CategoryCard
            title="Beauty & Wellness"
            description="Salons, Spa, Grooming"
            image="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/saloon.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvc2Fsb29uLmpwZyIsImlhdCI6MTc2MTI5MDM4MiwiZXhwIjoxNzkyODI2MzgyfQ.Md4yFGP20W2bK1yTc9sY6JxixtTqb625-Q9Dk_fVdz8"
            onClick={() => browseCategory("Beauty & Wellness")}
          />

          {/* Home Services */}
          <CategoryCard
            title="Home Services"
            description="Cleaning, Plumbing, Electrical"
            image="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/homeservice.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaG9tZXNlcnZpY2UuanBnIiwiaWF0IjoxNzYxMjkwOTYyLCJleHAiOjE3OTI4MjY5NjJ9.xwPueH2UnVuiBYPiTW9Evy0yB26Rx-ZYInwHmeKEaUg"
            onClick={() => browseCategory("Home Services")}
          />

          {/* Automotive */}
          <CategoryCard
            title="Pet & Animals"
            description="cat care, dog care, grooming, training, walking, pet sitting, boarding, daycare, veterinary services, pet training, "
            image="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/taxi.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdGF4aS5qcGciLCJpYXQiOjE3NjEyOTExMjMsImV4cCI6MTc5MjgyNzEyM30.Dr3Rn9E1BShrymodkCEz5sdQd29IphOwfIheG_LQN7g"
            onClick={() => browseCategory("Automotive")}
          />

          {/* Technology */}
          <CategoryCard
            title="Technology"
            description="IT Support, Repairs, Setup"
            image="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/tech.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvdGVjaC5qcGciLCJpYXQiOjE3NjEyOTEyMTUsImV4cCI6MTc5MjgyNzIxNX0.D43Vo0-iFmL4SUS3rT1HQ4alKsLDBPkyYg1kzPbdkYI"
            onClick={() => browseCategory("Technology & IT")}
          />
        </div>
      </section>

      {/* Footer CTA */}
      <div className="flex justify-center mt-20 mb-20">
        <button className="btn btn-wide btn-primary">View All Services</button>
      </div>
    </main>
  );
}

/* =========================
  Category Card Component
========================= */

function CategoryCard({
  title,
  description,
  image,
  onClick,
}: {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}) {
  return (
    <div className="card bg-base-100 shadow-lg border hover:scale-105 transition-transform">
      <figure>
        <img src={image} alt={title} className="h-56 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onClick}>
            Browse Now
          </button>
        </div>
      </div>
    </div>
  );
}
