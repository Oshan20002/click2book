"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ManageServices() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({
    service_name: "",
    category: "",
    description: "",
    city: "",
    map_url: "",
  });

  // 🔐 Auth + Provider check + Fetch services
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/Login");
        return;
      }

      setUser(data.user);

      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (!profile || profile.role !== "provider") {
        router.push("/");
        return;
      }

      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .eq("provider_id", data.user.id)
        .order("created_at", { ascending: false });

      setServices(servicesData || []);
      setLoading(false);
    };

    init();
  }, [router]);

  // 📝 Start Edit
  const startEdit = (service: any) => {
    setEditingId(service.id);
    setEditForm({
      service_name: service.service_name,
      category: service.category,
      description: service.description,
      city: service.city,
      map_url: service.map_url,
    });
  };

  // 💾 Save Edit
  const saveEdit = async (id: string) => {
    const { error } = await supabase
      .from("services")
      .update({
        service_name: editForm.service_name,
        category: editForm.category,
        description: editForm.description,
        city: editForm.city,
        map_url: editForm.map_url,
      })
      .eq("id", id)
      .eq("provider_id", user.id); // 🔒 RLS safe

    if (error) {
      alert(error.message);
      return;
    }

    setServices(services.map((s) => (s.id === id ? { ...s, ...editForm } : s)));

    setEditingId(null);
  };

  // 🗑 Delete service
  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>City</th>
              <th>Map</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                {/* Service Name */}
                <td>
                  {editingId === service.id ? (
                    <input
                      className="input input-bordered w-full"
                      value={editForm.service_name}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          service_name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    service.service_name
                  )}
                </td>

                {/* Category */}
                <td>
                  {editingId === service.id ? (
                    <select
                      className="select select-bordered w-full"
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                    >
                      <option>Home Services</option>
                      <option>Beauty & Wellness</option>
                      <option>Automotive</option>
                      <option>Education & Tutoring</option>
                      <option>Events & Entertainment</option>
                      <option>Health & Medical</option>
                      <option>Technology & IT</option>
                    </select>
                  ) : (
                    service.category
                  )}
                </td>

                {/* Description */}
                <td>
                  {editingId === service.id ? (
                    <textarea
                      className="textarea textarea-bordered w-full"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    service.description
                  )}
                </td>

                {/* City */}
                <td>
                  {editingId === service.id ? (
                    <input
                      className="input input-bordered w-full"
                      value={editForm.city}
                      onChange={(e) =>
                        setEditForm({ ...editForm, city: e.target.value })
                      }
                    />
                  ) : (
                    service.city
                  )}
                </td>

                {/* Map */}
                <td>
                  {editingId === service.id ? (
                    <input
                      type="url"
                      className="input input-bordered w-full"
                      value={editForm.map_url}
                      onChange={(e) =>
                        setEditForm({ ...editForm, map_url: e.target.value })
                      }
                    />
                  ) : (
                    <a
                      href={service.map_url}
                      target="_blank"
                      className="link link-primary"
                    >
                      View Map
                    </a>
                  )}
                </td>

                {/* Actions */}
                <td className="flex gap-2">
                  {editingId === service.id ? (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => saveEdit(service.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => startEdit(service)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => deleteService(service.id)}
                      >
                        Delete
                      </button> 
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
