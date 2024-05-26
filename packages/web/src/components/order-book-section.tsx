export interface IOrderBookItem {
  price: string
  quantity: string
}

interface IOrderBookSectionProps {
  label: string;
  baseAsset: string;
  quoteAsset: string;
  data: IOrderBookItem[]
}

export const OrderBookSection = ({
  label,
  baseAsset,
  quoteAsset,
  data,
}: IOrderBookSectionProps) => {
  const columns = [
    {
      label: "Side",
      rowRender: (row: IOrderBookItem, index: number) => `${label} ${index + 1} `
    },
    {
      label: `Price (${quoteAsset})`,
      rowRender: (row: IOrderBookItem) => `${row.price}`
    },
    {
      label: `Amount (${baseAsset})`,
      rowRender: (row: IOrderBookItem) => `${Number(row.quantity)}`
    },
    {
      label: `Total (${quoteAsset})`,
      rowRender: (row: IOrderBookItem) => `${(Number(row.quantity) * Number(row.price)).toFixed(4)}`
    },
    {
      label: `Sum (${quoteAsset})`,
      rowRender: (row: IOrderBookItem) => `${(Number(row.quantity) * Number(row.price)).toFixed(4)}`
    },
  ];

  return (
    <div className="border-gray-200 rounded-sm p-4 border-solid border">
      <h3 className="font-semibold text-left">{`${label} Order`}</h3>
      <div className="grid grid-cols-5 pt-4 pb-1 border-b border-solid border-b-gray-200">
        {columns.map((column) => (
          <div>
            <p className="text-xs">{column.label}</p>
          </div>
        ))}
      </div>
      <div >
        { data.map((item, index) => (
          <div key={item.price} className="grid grid-cols-5 pt-4 pb-1 border-b border-solid border-b-gray-200">
            {columns.map((column) => (
              <div>
                <p className="text-xs">{column.rowRender(item, index)}</p>
              </div>
            ))}
          </div>
        )) }
      </div>
    </div>
  );
};
