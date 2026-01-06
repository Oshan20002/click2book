import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // PayHere sends x-www-form-urlencoded
    const rawBody = await req.text();
    const params = new URLSearchParams(rawBody);

    const merchant_id = params.get("merchant_id");
    const order_id = params.get("order_id"); // PayHere order_id
    const status_code = Number(params.get("status_code"));

    console.log("PayHere notify received:", {
      merchant_id,
      order_id,
      status_code,
    });

    // ✅ Validate merchant
    if (merchant_id !== "1233476") {
      console.error("Invalid merchant ID:", merchant_id);
      return new Response("Invalid merchant", { status: 400 });
    }

    // ✅ Only process successful payments
    if (status_code !== 2) {
      console.log("Payment not successful:", status_code);
      return new Response("Ignored", { status: 200 });
    }

    if (!order_id) {
      console.error("Missing order_id");
      return new Response("Bad request", { status: 400 });
    }

    // ✅ Supabase service client (bypasses RLS)
    const supabase = createClient(
      Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ✅ Update booking using payhere_order_id
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "completed" })
      .eq("payhere_order_id", order_id)
      .select();

    if (error) {
      console.error("Booking update failed:", error);
      return new Response("DB error", { status: 500 });
    }

    if (!data || data.length === 0) {
      console.error("No booking found for order_id:", order_id);
      return new Response("No booking found", { status: 404 });
    }

    console.log("✅ Booking marked as completed:", data[0].id);
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("PayHere notify error:", err);
    return new Response("Server error", { status: 500 });
  }
});
