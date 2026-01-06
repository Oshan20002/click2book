import crypto from "crypto";

export function generatePayHereHash(
  merchantId: string,
  orderId: string,
  amount: string,
  currency: string,
  merchantSecret: string
) {
  const hashString =
    merchantId +
    orderId +
    amount +
    currency +
    crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex");

  return crypto
    .createHash("md5")
    .update(hashString)
    .digest("hex")
    .toUpperCase();
}
