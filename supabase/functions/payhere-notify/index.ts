import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS (PayHere doesn't care, but Supabase needs it)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // PayHere sends x-www-form-urlencoded
    const formData = await req.formData();

    const orderId = formData.get("order_id")?.toString();
    const statusCode = formData.get("status_code")?.toString();
    const merchantId = formData.get("merchant_id")?.toString();

    console.log("PayHere notify received:", {
      orderId,
      statusCode,
      merchantId,
    });

    // basic validation
    if (!orderId) {
      console.error("Missing order_id");
      return new Response("Missing order_id", { status: 400 });
    }

    // success payment status_code === 2
    if (statusCode === "2") {
      const supabase = createClient(
        Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const { error } = await supabase
        .from("bookings")
        .update({ status: "completed" })
        .eq("payhere_order_id", orderId);

      if (error) {
        console.error("DB update failed:", error);
        return new Response("DB error", { status: 500 });
      }

      console.log("Booking marked as completed:", orderId);
    } else {
      console.log("Payment not successful. Status:", statusCode);
    }

    // PayHere requires 200 OK
    return new Response("OK", { headers: corsHeaders });
  } catch (err) {
    console.error("Notify error:", err);
    return new Response("Internal error", { status: 500 });
  }
});
