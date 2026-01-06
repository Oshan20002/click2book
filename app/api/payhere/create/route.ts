import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    // 1️⃣ Read request body
    const { bookingId, amount, customer } = await req.json();

    if (!bookingId || !amount) {
      return NextResponse.json(
        { error: "Missing bookingId or amount" },
        { status: 400 }
      );
    }

    // 2️⃣ Create Supabase client (server-side)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3️⃣ Generate PayHere order_id
    const orderId = `PH_${bookingId}`;

    // 4️⃣ Save PayHere order_id into bookings table
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ payhere_order_id: orderId })
      .eq("id", bookingId);

    if (updateError) {
      console.error("Failed to save payhere_order_id:", updateError);
      return NextResponse.json(
        { error: "Database update failed" },
        { status: 500 }
      );
    }

    // 5️⃣ Build PayHere payment payload
    const payhereData = {
      merchant_id: "1233476",

      return_url: "https://click2book.vercel.app/payment-success",
      notify_url:
        "https://krxkuasaiqaulxfbqnad.functions.supabase.co/payhere-notify",

      order_id: orderId,
      items: "Booking Payment",
      currency: "LKR",
      amount: amount,

      first_name: customer?.first_name || "Customer",
      last_name: customer?.last_name || "User",
      email: customer?.email || "customer@email.com",
      phone: customer?.phone || "0770000000",
      address: customer?.address || "Sri Lanka",
      city: customer?.city || "Colombo",
      country: "Sri Lanka",
    };

    // 6️⃣ Send PayHere data to frontend
    return NextResponse.json(payhereData);
  } catch (error) {
    console.error("Create PayHere payment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
