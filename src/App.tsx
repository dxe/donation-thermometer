import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Thermometer } from "./components/thermometer";

const App = ({ domElement }: { domElement?: Element }) => {
  const startDate = domElement?.getAttribute("data-start-date") ?? "";
  const goal = parseInt(domElement?.getAttribute("data-goal") ?? "0", 10);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Thermometer startDate={startDate} goal={goal} />
    </QueryClientProvider>
  );
};

export default App;
