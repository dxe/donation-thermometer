export const formatUSD = (input: number) =>
  input.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
