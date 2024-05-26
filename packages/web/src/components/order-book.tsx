import { IGetPriceChangeStatsResponse } from "@/apis/get-price-change-stats";
import { IOrderBookItem, OrderBookSection } from "./order-book-section";

interface IOrderBookProps {
  symbol: string;
  baseAsset: string
  quoteAsset: string
  bids: IOrderBookItem[]
  asks: IOrderBookItem[]
  stats?: IGetPriceChangeStatsResponse
}

export const OrderBook = ({ symbol, baseAsset, quoteAsset, bids, asks, stats }: IOrderBookProps) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Order Book
        </h2>
        <div className="w-8 h-0.5 bg-black mx-2"></div>
        <h3 className="scroll-m-20 text-xl tracking-tight">{symbol}</h3>
      </div>
      <div>
        <p className="text-xs" style={{color: Number(stats?.priceChangePercent)  < 0 ? 'red' : 'green'}}>{Number(stats?.priceChangePercent).toFixed(2)}%</p>
        <p className="text-xs">Volume: { Number(stats?.volume) }</p>
      </div>
      <div className="py-4 flex gap-8">
        <div className="flex-1">
          <OrderBookSection baseAsset={baseAsset} quoteAsset={quoteAsset} label="Buy" data={bids} />
        </div>
        <div className="flex-1">
          <OrderBookSection baseAsset={baseAsset} quoteAsset={quoteAsset} label="Sell" data={asks} />
        </div>
      </div>
    </div>
  );
};
