"use client";

type Props = {
  searchParams: {
    booking_id?: string;
  };
};


import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PaymentSuccess({ searchParams }: Props) {
  const bookingId = searchParams.booking_id;



  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    if (!bookingId) {
      setStatus("error");
      return;
    }

    const checkBookingStatus = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("status")
        .eq("id", bookingId)
        .single();

      if (error || !data) {
        setStatus("error");
        return;
      }

      if (data.status === "completed") {
        setStatus("success");
      } else {
        // still waiting for PayHere notify
        setTimeout(checkBookingStatus, 2000);
      }
    };

    checkBookingStatus();
  }, [bookingId]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">
          Processing payment, please wait...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-600">
          Payment failed or booking not found
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
