import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // PayHere sends x-www-form-urlencoded
    const rawBody = await req.text();
    const params = new URLSearchParams(rawBody);

    const payment_id = params.get("payment_id");
    const status_code = params.get("status_code");

    console.log("PayHere notify received:", {
      payment_id,
      status_code,
    });

    // Only process successful payments
    if (status_code !== "2" || !payment_id) {
      return new Response("IGNORED", { status: 200 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    /**
     * IMPORTANT:
     * Because payment links do not send order_id,
     * we attach this payment to the latest pending booking
     */
    const { error, data } = await supabase
      .from("bookings")
      .update({
        status: "completed",
        payhere_payment_id: payment_id, // ✅ REAL ID FROM PAYHERE
      })
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .select();

    if (error) {
      console.error("DB update error:", error);
      return new Response("DB ERROR", { status: 500 });
    }

    console.log("Booking updated:", data);

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Edge function crash:", err);
    return new Response("CRASH", { status: 500 });
  }
});
