export const formatPrice = (price?: number | string) => {
  const value = Number(price);

  if (isNaN(value)) return "0";

  // 1 Crore = 10,000,000
  if (value >= 10000000) {
    const crore = value / 10000000;
    return `${parseFloat(crore.toFixed(2))} Crore`;
  }

  // 1 Lakh = 100,000
  if (value >= 100000) {
    const lakh = value / 100000;
    return `${parseFloat(lakh.toFixed(2))} Lacs`;
  }

  return value.toLocaleString("en-PK");
};