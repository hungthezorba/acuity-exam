import { type DefaultOptions, QueryClient, type UseQueryOptions } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
  queries: {
    // useErrorBoundary: true,
    refetchOnWindowFocus: true,
    retry: false,
    // refetchInterval: 10000,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: []) => unknown> = Awaited<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: never) => unknown> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;