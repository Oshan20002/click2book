import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import md5 from "https://esm.sh/md5@2.3.0";

serve(async (req) => {
  const body = await req.json();

  const {
    merchant_id,
    order_id,
    amount,
    currency,
  } = body;

  const merchant_secret = Deno.env.get("PAYHERE_MERCHANT_SECRET")!;

  const hash = md5(
    merchant_id +
      order_id +
      amount.toFixed(2) +
      currency +
      md5(merchant_secret).toUpperCase()
  ).toUpperCase();

  return new Response(
    JSON.stringify({ hash }),
    { headers: { "Content-Type": "application/json" } }
  );
});
