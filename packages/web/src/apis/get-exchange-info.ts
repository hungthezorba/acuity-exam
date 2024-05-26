import { binanceAxios } from "@/lib/binance-axios"

export const getExchangeInfo = () => {
  return binanceAxios.get<GetExchangeInfoResponse>('/exchange-info').then(res => res.data)
}

interface GetExchangeInfoResponse {
  timezone: string
  serverTime: number
  symbols: {
    symbol: string
    baseAsset: string
    quoteAsset: string
  }[]
}