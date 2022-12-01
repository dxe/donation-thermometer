const API_URL = "https://finance-reporting.dxe.io/api/thermometer";

export const fetchDonationData = async ({
  startDate,
}: {
  startDate: string;
}) => {
  const resp = await fetch(`${API_URL}?start_date=${startDate}`);
  const json = (await resp.json()) as { amt: string; count: string };
  return {
    amt: parseFloat(json.amt === "None" ? "0" : json.amt),
    count: parseFloat(json.count),
  };
};
