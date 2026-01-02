"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export default function BookingPage() {
    const Router = useRouter();

  return (
    <main className="p-10 bg-gray-50 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Back Button */}
        <div className="col-span-2">
            <button onClick={() => Router.back()}
                className="text-blue-600 mb-5"> ← Back to Service
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-10 bg-white rounded-xl shadow p-6">
            {/* LEFT CARD */}

            <div className="card-body">
                <figure>
                    <img
                    src="https://krxkuasaiqaulxfbqnad.supabase.co/storage/v1/object/sign/Images/helthcare.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80NThmNGRmMi1iOGI3LTQ4ZWItOTU2YS01MGU2YmFhYTg2MGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaGVsdGhjYXJlLmpwZyIsImlhdCI6MTc2MTI4OTc2MywiZXhwIjoxODQ3Njg5NzYzfQ.WwdqaHdjiC14uHeq8Lex7EZ_9NHOr6KnPq7nNLarxq4"
                    className = "rounded-lg w-full h-56 object-cover"
                    alt="services" />
                </figure>

                <h2 className="text-2xl font-bold mt-4">General Health Checkup</h2>
                <p className="text-gray-500 mt-1">⭐⭐⭐⭐⭐ 4.5 (27)</p>
                <p className="text-green-600 text-xl font-semibold mt-1"> 🏷️ Rs. 2,500</p>
                    <div className="mt-3 text-gray-600 space-y-1">
                        <p>⏱ 30 Minutes</p>
                        <p>📍 Colombo</p>
                        <p>🗓 Available Today</p>
                    </div>
                <hr className="my-4" />

                <h3 className="font-semibold">Service Description</h3>
                <p className="text-gray-600 text-sm mt-1">
                    Comprehensive health screening including blood pressure,weight, height, blood tests, and consultation with anexperienced doctor. </p>
            </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Book This Service</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 mb-2">Preferred Date</label>
                    <input type="date" className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Preferred Time</label>
                    <select className="w-full p-2 border rounded">
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input type="name" className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input type="phone" className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Your Address</label>
                    <input type="address" className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Additional Notes(Optional)</label>
                    <input type="notes" className="w-full p-10 border rounded" />
                    <p className="text-gray-500 text-sm mt-1">0/500 characters</p>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg mt-4 text-sm text-blue-500 col-span-2">
                    <p className="font-semibold">⚠️ Booking Policy</p>
                    <ul className="list-disc list-inside mt-2 space-x-5">
                        <li>Booking confirmation will be sent via SMS and email</li>
                        <li>Cancellation allowed up to 24 hours before service</li>
                        <li>Payment can be made in cash or online upon confirmation</li>
                        <li>Service provider will contact you to confirm details</li>
                    </ul>
                </div>
                
            </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-6">
                    Continue to Confirmation
                </button>
        </div>

    </main>
  );
}
