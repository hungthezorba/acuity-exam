import { getPriceChangeStats, IGetPriceChangeStatsParams } from "@/apis/get-price-change-stats";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getPriceChangeStats;

export const useGetPriceChangeStats = (params: IGetPriceChangeStatsParams, config?: QueryConfig<QueryFnType>) => {
  return useQuery({
    ...config,
    queryKey: useGetPriceChangeStats.keys(params),
    queryFn: () => getPriceChangeStats(params)
  })
}

useGetPriceChangeStats.keys = (params: IGetPriceChangeStatsParams) => ['price-change', params]