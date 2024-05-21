export const convertCurrency = (amount: number, currency = "PHP") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
