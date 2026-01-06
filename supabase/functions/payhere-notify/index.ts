import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const bodyText = await req.text();
  const params = new URLSearchParams(bodyText);

  const order_id = params.get("order_id");
  const status_code = params.get("status_code");

  console.log("Notify:", { order_id, status_code });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  if (!order_id) {
    return new Response("NO ORDER ID", { status: 400 });
  }

  // ✅ SUCCESS
  if (status_code === "2") {
    await supabase
      .from("bookings")
      .update({ status: "completed" })
      .eq("payhere_order_id", order_id);

    return new Response("OK", { status: 200 });
  }

  // ❌ FAILED / CANCELLED
  await supabase
    .from("bookings")
    .update({ status: "failed" })
    .eq("payhere_order_id", order_id);

  return new Response("FAILED", { status: 200 });
});
