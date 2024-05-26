import { binanceAxios } from "@/lib/binance-axios"

export interface IGetPriceChangeStatsParams {
  symbol: string
}

export const getPriceChangeStats = (params: IGetPriceChangeStatsParams) => {
  return binanceAxios.get<IGetPriceChangeStatsResponse>('/ticker/24hr', { params }).then(res => res.data)
}

export interface IGetPriceChangeStatsResponse {
  symbol: string
  priceChangePercent: string
  volume: string
  openPrice: string
}