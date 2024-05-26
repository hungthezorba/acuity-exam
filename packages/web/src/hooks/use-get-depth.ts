import { getDepth, IGetDepthParams } from "@/apis/get-depth";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

type QueryFnType = typeof getDepth;

export const useGetDepth = (params: IGetDepthParams, config?: QueryConfig<QueryFnType>) => {
  return useQuery({
    ...config,
    queryKey: useGetDepth.keys(params),
    queryFn: () => getDepth(params)
  })
}

useGetDepth.keys = (params: IGetDepthParams) => ['depth', params]