import { binanceAxios } from "@/lib/binance-axios"

export interface IGetDepthParams {
  symbol: string
}

export const getDepth = (params: IGetDepthParams) => {
  return binanceAxios.get<IGetDepthResponse>('/depth', { params }).then(res => res.data)
}

interface IGetDepthResponse {
  lastUpdateId: number
  bids: string[][]
  asks: string[][]
}