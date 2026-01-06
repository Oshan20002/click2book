import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generatePayHereHash } from "@/lib/payhere";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { bookingId } = await req.json();

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single();

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const merchantId = process.env.PAYHERE_MERCHANT_ID!;
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET!;
  const amount = booking.total_price.toFixed(2);
  const currency = "LKR";

  const hash = generatePayHereHash(
    merchantId,
    bookingId,
    amount,
    currency,
    merchantSecret
  );

  return NextResponse.json({
    merchant_id: merchantId,
    order_id: bookingId,
    items: "Ad Booking",
    amount,
    currency,
    hash,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?booking_id=${bookingId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancel`,
    notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payhere-notify`,
  });
}
