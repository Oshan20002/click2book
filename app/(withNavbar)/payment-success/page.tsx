"use client";

import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const [status, setStatus] = useState<"loading" | "success">("loading");

  useEffect(() => {
    // Give Edge Function time to update DB
    const timer = setTimeout(() => {
      setStatus("success");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">
          Processing payment, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ Booking Successful!
      </h1>
      <p className="mt-2">
        Your payment was completed successfully.
      </p>
    </div>
  );
}
