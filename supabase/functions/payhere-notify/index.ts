import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ✅ IMPORTANT: PayHere sends FORM DATA, not JSON
    const formData = await req.formData();

    const merchant_id = formData.get("merchant_id")?.toString();
    const order_id = formData.get("order_id")?.toString();
    const status_code = Number(formData.get("status_code"));

    console.log("PayHere notify received:", {
      merchant_id,
      order_id,
      status_code,
    });

    // ✅ Validate
    if (!order_id) {
      console.error("Missing order_id");
      return new Response("Missing order_id", { status: 400 });
    }

    if (merchant_id !== "1233476") {
      console.error("Invalid merchant_id");
      return new Response("Invalid merchant", { status: 401 });
    }

    // Only successful payments
    if (status_code !== 2) {
      console.log("Payment not completed:", status_code);
      return new Response("Ignored", { status: 200 });
    }

    // Supabase client (SERVICE ROLE REQUIRED)
    const supabase = createClient(
      Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ✅ Update BOOKINGS table
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "completed",
        paid_at: new Date().toISOString(),
      })
      .eq("payhere_order_id", order_id);

    if (error) {
      console.error("Database update failed:", error);
      return new Response("DB error", { status: 500 });
    }

    console.log("Booking marked as completed:", order_id);

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Server error", { status: 500 });
  }
});
