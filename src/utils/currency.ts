export const FREE_SHIPPING_THRESHOLD = 10000;
export const STANDARD_SHIPPING = 300;

export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-US")}`;
}

export function getShipping(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
}