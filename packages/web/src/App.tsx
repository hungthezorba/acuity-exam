import { useEffect, useMemo, useState } from "react";
import { Combobox } from "./components/ui/combo-box";
import { useGetExchangeInfoQuery } from "./hooks/use-get-exchange-info";
import { OrderBook } from "./components/order-book";
import { useGetDepth } from "./hooks/use-get-depth";
import { socket } from "./lib/socket";
import { IOrderBookItem } from "./components/order-book-section";
import { useGetPriceChangeStats } from "./hooks/use-get-price-change-stats";

interface IDepthUpdate {
  E: number
  U: number
  a: string[][]
  b: string[][]
  e: "depthUpdate"
  s: string
  u: number
}

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<{
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
  }>();
  const [bids, setBids] = useState<IOrderBookItem[]>([]);
  const [asks, setAsks] = useState<IOrderBookItem[]>([]);

  const getExchangeInfoQuery = useGetExchangeInfoQuery({
    staleTime: Infinity,
  });

  const getDepthQuery = useGetDepth(
    {
      symbol: selectedSymbol?.symbol || "",
    },
    { enabled: !!selectedSymbol?.symbol }
  );

  const getPriceChangeStatsQuery = useGetPriceChangeStats(
    {
      symbol: selectedSymbol?.symbol || "",
    },
    { enabled: !!selectedSymbol?.symbol, refetchInterval: 1000 }
  )

  const symbolOptions = useMemo(
    () =>
      getExchangeInfoQuery?.data?.symbols?.map((symbol) => ({
        value: symbol.symbol,
        label: symbol.symbol,
        data: {
          baseAsset: symbol.baseAsset,
          quoteAsset: symbol.quoteAsset,
        },
      })) || [],
    [getExchangeInfoQuery.data]
  );

  const handleSelectSymbol = (value: string) => {
    socket.emit("disconnect_depth");

    const found = getExchangeInfoQuery.data?.symbols.find(
      (symbol) => symbol.symbol === value
    );
    if (!found) return;
    const { symbol, baseAsset, quoteAsset } = found;
    setSelectedSymbol({
      symbol,
      baseAsset,
      quoteAsset,
    });

    socket.emit("connect_depth", symbol.toLowerCase());
  };

  useEffect(() => {
    const onConnect = () => {
      console.log("socket connect");
    };

    const onDisconnect = () => {
      console.log("socket disconnect");
    };


    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    setBids(
      getDepthQuery.data?.bids.map((item) => ({
        price: item[0],
        quantity: item[1],
      })) || []
    );

    setAsks(
      getDepthQuery.data?.asks.map((item) => ({
        price: item[0],
        quantity: item[1],
      })) || []
    );
  }, [getDepthQuery.data?.lastUpdateId]);


  useEffect(() => {
    const mergeOrderBook = (originDepth: IOrderBookItem[], depthUpdate: IDepthUpdate, type: 'b' | 'a', ordered: 'asc' | 'desc') => {
      const removed = depthUpdate[type].filter((item => Number(item[1]) === 0)).map(item => item.toString())
      const updated = depthUpdate[type].filter(item => Number(item[1]) !== 0).map((item) => ({
        price: item[0],
        quantity: item[1],
      }))

      // handle bids
      const filtered = originDepth.filter(item => !removed.includes(item.price))
      const result = [...updated, ...filtered];

      const uniquePrices = new Set();

      const mergedAndFiltered = result.filter(obj => {
          if (uniquePrices.has(obj.price)) {
              return false;
          } else {
              uniquePrices.add(obj.price);
              return true;
          }
      });


      mergedAndFiltered.sort((a, b) => {
          if (ordered === 'asc') return Number(a.price) - Number(b.price);
          return Number(b.price) - Number(a.price)
      });

      return mergedAndFiltered.slice(0, 100)

    }
    const onUpdateDepth = (data: IDepthUpdate) => {
      if (!getDepthQuery.data?.lastUpdateId) return
      if ( data.u <= getDepthQuery.data?.lastUpdateId) return
      const bidsResult = mergeOrderBook(bids, data, 'b', 'desc')
      const asksResult = mergeOrderBook(asks, data, 'a', 'asc')
      setBids(bidsResult)
      setAsks(asksResult)

      // handle asks
    };

    socket.on('update_depth', onUpdateDepth)

    return () => {
      socket.off('update_depth', onUpdateDepth)
    }
  }, [bids, asks, getDepthQuery.data?.lastUpdateId])

  return (
    <div className="">
      <Combobox options={symbolOptions} onChange={handleSelectSymbol} />
      {selectedSymbol && (
        <div className="mt-4">
          <OrderBook
            stats={getPriceChangeStatsQuery.data}
            symbol={selectedSymbol.symbol}
            baseAsset={selectedSymbol.baseAsset}
            quoteAsset={selectedSymbol.quoteAsset}
            asks={asks}
            bids={bids}
          />
        </div>
      )}
    </div>
  );
}

export default App;
