"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
          In One Place
        </h2>
        <p className="text-2xl text-center max-w-4xl mx-auto mt-8">
          Connect with trusted service providers across Sri Lanka.
        </p>
      </div>

      {/* Browse by Category */}
      <section className="mt-20">
        <h2 className="text-center text-4xl font-bold">
          Browse by Category
        </h2>
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
            title="Transportation"
            description="Taxi, Delivery"
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
        <button className="btn btn-wide btn-primary">
          View All Services
        </button>
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
