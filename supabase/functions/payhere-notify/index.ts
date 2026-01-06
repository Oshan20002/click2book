import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);

    const payment_id = params.get("payment_id");
    const status_code = params.get("status_code");

    console.log("PayHere notify:", { payment_id, status_code });

    if (status_code !== "2" || !payment_id) {
      return new Response("IGNORED", { status: 200 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.rpc(
      "mark_booking_completed_by_payment_id",
      { p_payment_id: payment_id }
    );

    if (error) {
      console.error("SQL error:", error);
      return new Response("ERROR", { status: 500 });
    }

    return new Response("OK", { status: 200 });

  } catch (err) {
    console.error("CRASH:", err);
    return new Response("CRASH", { status: 500 });
  }
});
