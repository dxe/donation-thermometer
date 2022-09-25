import { useQuery } from "react-query";
import React, { useMemo } from "react";
import { formatUSD } from "../utils/format";
import classNames from "classnames";
import { fetchDonationData } from "../api/donations";

const queryOptions = {
  // Refetch every minute.
  refetchInterval: 1000 * 60,
};

export const Thermometer = ({
  startDate,
  goal,
}: {
  startDate: string;
  goal: number;
}) => {
  const { data, isLoading, isError } = useQuery<{ amt: number; count: number }>(
    "thermometer",
    () => fetchDonationData({ startDate }),
    queryOptions
  );
  const progress = useMemo(
    () => ((data?.amt ?? 0) / goal) * 100,
    [data?.amt, goal]
  );

  return isError ? null : (
    <div
      className={classNames(
        "w-full bg-white rounded-lg flex flex-col py-6 px-4 shadow-md gap-4",
        { "animate-pulse": isLoading }
      )}
    >
      <div className="flex justify-between gap-4">
        <div
          className={classNames(
            "flex flex-col md:flex-row gap-1 md:gap-3 md:items-center",
            { "text-gray-400": !data }
          )}
        >
          <span className="text-2xl font-medium">
            {data ? formatUSD(data.amt) : "$"}
          </span>
          <span className="text-sm whitespace-nowrap">
            {data?.count.toLocaleString() ?? "Loading"} donations
          </span>
        </div>
        <div className="self-end text-right">
          <span className="text-sm uppercase">Goal</span>{" "}
          <span className="font-medium">{formatUSD(goal)}</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-5 dark:bg-gray-700 overflow-hidden">
        <div
          className="bg-primary h-5 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
