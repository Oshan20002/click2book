"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PaymentSuccess() {
  const [status, setStatus] = useState<
    "loading" | "success" | "failed"
  >("loading");

  useEffect(() => {
    const checkStatus = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("status")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!data) return;

      if (data.status === "completed") {
        setStatus("success");
      } else if (data.status === "failed") {
        setStatus("failed");
      } else {
        setTimeout(checkStatus, 2000);
      }
    };

    checkStatus();
  }, []);

  if (status === "loading") {
    return <p className="text-center mt-20">Processing payment…</p>;
  }

  if (status === "failed") {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl text-red-600">❌ Payment Failed</h1>
        <p>Please try again.</p>
      </div>
    );
  }

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl text-green-600">✅ Payment Successful</h1>
      <p>Your booking is confirmed.</p>
    </div>
  );
}
