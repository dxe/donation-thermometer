import { useQuery } from "react-query";
import React, { useMemo } from "react";
import { formatUSD } from "../utils/format";
import classNames from "classnames";
import { fetchDonationData } from "../api/donations";
import { getNextGoal } from "../utils/calculate-goal";

const queryOptions = {
  // Refetch every minute.
  refetchInterval: 1000 * 60,
};

export const Thermometer = ({
  startDate,
  goal,
  offset,
}: {
  startDate: string;
  goal: number;
  offset: number;
}) => {
  const { data, isLoading, isError } = useQuery<{ amt: number; count: number }>(
    "thermometer",
    () => fetchDonationData({ startDate }),
    queryOptions
  );
  const calculatedAmt = useMemo(
    () => (!data?.amt ? 0 : data?.amt - offset),
    [data?.amt, offset]
  );
  const calculatedGoal = useMemo(
    () => (goal !== 0 ? goal : !calculatedAmt ? 0 : getNextGoal(calculatedAmt)),
    [calculatedAmt, goal]
  );
  const progress = useMemo(
    () => (!calculatedAmt ? 0 : (calculatedAmt / calculatedGoal) * 100),
    [calculatedAmt, calculatedGoal]
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
            {data ? formatUSD(calculatedAmt) : "$"}
          </span>
          <span className="text-sm whitespace-nowrap">
            {data?.count.toLocaleString() ?? "Loading"} donations
          </span>
        </div>
        <div className="self-end text-right">
          <span className="text-sm uppercase">Goal</span>{" "}
          <span className="font-medium">{formatUSD(calculatedGoal)}</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
        <div
          className="bg-primary h-5 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
