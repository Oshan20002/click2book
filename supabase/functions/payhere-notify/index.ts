import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const body = await req.json();

  const { order_id, status_code } = body;

  if (status_code !== 2 || !order_id) {
    return new Response("IGNORED");
  }

  const supabase = createClient(
    Deno.env.get("NEXT_PUBLIC_SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  await supabase
    .from("bookings")
    .update({ status: "confirmed" })
    .eq("payhere_order_id", order_id);

  return new Response("OK");
});
