import { IPrices } from "../../../components/Layout/interfaces";
import { formatPriceParts } from "../../../utils/general";

export const PriceDisplay = ({ price }: { price: IPrices }) => {
  return (
    <div className="space-x-2">
      <span>{formatPriceParts(price).symbol}</span>
      <span>{formatPriceParts(price).value}</span>
    </div>
  );
};
