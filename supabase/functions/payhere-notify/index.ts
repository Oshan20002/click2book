import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // PayHere sends x-www-form-urlencoded
    const rawBody = await req.text();
    console.log("RAW BODY:", rawBody);

    const params = new URLSearchParams(rawBody);

    const payment_id = params.get("payment_id");
    const status_code = params.get("status_code");

    console.log("PARSED:", { payment_id, status_code });

    // Only successful payments
    if (!payment_id || status_code !== "2") {
      return new Response("IGNORED", { status: 200 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 🔥 DIRECT UPDATE — NO RPC
    const { error } = await supabase
      .from("bookings")
      .update({ status: "completed" })
      .eq("payhere_payment_id", payment_id);

    if (error) {
      console.error("DB ERROR:", error);
      return new Response("DB ERROR", { status: 500 });
    }

    return new Response("OK", { status: 200 });

  } catch (e) {
    console.error("CRASH:", e);
    return new Response("CRASH", { status: 500 });
  }
});
