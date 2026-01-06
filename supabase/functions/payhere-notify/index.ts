import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const form = await req.formData();

  const orderId = form.get("order_id")?.toString();
  const statusCode = form.get("status_code")?.toString();
  const amount = form.get("payhere_amount")?.toString();

  if (!orderId || statusCode !== "2") {
    return new Response("Payment not successful", { status: 200 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await supabase
    .from("bookings")
    .update({
      status: "completed",
      paid_amount: amount,
    })
    .eq("id", orderId);

  if (error) {
    console.error(error);
    return new Response("Database error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
});
