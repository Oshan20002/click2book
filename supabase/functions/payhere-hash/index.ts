import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import md5 from "https://esm.sh/md5@2.3.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { merchant_id, order_id, amount, currency } = await req.json();

  const secret = Deno.env.get("PAYHERE_MERCHANT_SECRET");
  if (!secret) {
    return new Response("SECRET MISSING", { status: 500, headers: corsHeaders });
  }

  const hash = md5(
    merchant_id +
      order_id +
      Number(amount).toFixed(2) +
      currency +
      md5(secret).toUpperCase()
  ).toUpperCase();

  return new Response(JSON.stringify({ hash }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
