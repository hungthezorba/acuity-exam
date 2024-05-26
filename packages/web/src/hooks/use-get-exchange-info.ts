import { getExchangeInfo } from "@/apis/get-exchange-info";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getExchangeInfo;

export const useGetExchangeInfoQuery = (config?: QueryConfig<QueryFnType>) => {
  return useQuery({
    ...config,
    queryKey: useGetExchangeInfoQuery.keys(),
    queryFn: getExchangeInfo
  })
}

useGetExchangeInfoQuery.keys = () => ['exchange-info']