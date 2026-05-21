const API_URL = "https://finance-reporting.dxe.io/api/thermometer";

export const fetchDonationData = async ({
  startDate,
  formId,
}: {
  startDate: string;
  formId?: string;
}) => {
  const params = new URLSearchParams({ start_date: startDate });
  if (formId) params.set("form_id", formId);
  const resp = await fetch(`${API_URL}?${params}`);
  const json = (await resp.json()) as { amt: string; count: string };
  return {
    amt: parseFloat(json.amt === "None" ? "0" : json.amt),
    count: parseFloat(json.count),
  };
};
