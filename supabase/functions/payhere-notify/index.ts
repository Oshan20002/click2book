import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);

    const orderId = params.get("order_id");
    const paymentStatus = params.get("status"); // 2 = success

    console.log({ orderId, paymentStatus });

    if (!orderId || paymentStatus !== "2") {
      return new Response("Ignored", { status: 200 });
    }

    const supabase = createClient(
      // ✅ PUBLIC URL is OK
      Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!,
      // 🔐 MUST be service role
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase
      .from("bookings")
      .update({ status: "completed" })
      .eq("id", orderId);

    if (error) {
      console.error(error);
      return new Response("DB error", { status: 500 });
    }

    console.log("✅ Booking completed:", orderId);
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
});
