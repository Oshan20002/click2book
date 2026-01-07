"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function PaymentSuccess() {
  const [status, setStatus] = useState<
    "loading" | "success" | "failed"
  >("loading");

  useEffect(() => {
    let retryTimer: NodeJS.Timeout;

    const checkStatus = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("status")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        retryTimer = setTimeout(checkStatus, 2000);
        return;
      }

      if (data.status === "completed") {
        setStatus("success");
      } else if (data.status === "failed") {
        setStatus("failed");
      } else {
        retryTimer = setTimeout(checkStatus, 2000);
      }
    };

    checkStatus();

    return () => clearTimeout(retryTimer);
  }, []);

  /* ================= LOADING ================= */

  if (status === "loading") {
    return (
      <div className="text-center mt-20">
        <p className="text-lg font-semibold">
          Processing payment…
        </p>
      </div>
    );
  }

  /* ================= FAILED ================= */

  if (status === "failed") {
    return (
      <div className="text-center mt-20 space-y-4">
        <h1 className="text-2xl font-bold text-red-600">
          ❌ Payment Failed
        </h1>
        <p>Please try again.</p>

        <Link href="/">
          <button className="btn btn-outline btn-primary">
            Go to Home
          </button>
        </Link>
      </div>
    );
  }

  /* ================= SUCCESS ================= */

  return (
    <div className="text-center mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-green-600">
        ✅ Payment Successful
      </h1>
      <p>Your booking is confirmed.</p>

      <Link href="/">
        <button className="btn btn-primary">
          Go to Home
        </button>
      </Link>
    </div>
  );
}
