type SellButtonsProps = {
  price: number;
  shares: number;
  stockCode: string;
  onClick: () => void;
};
const SellButtons = ({
  price,
  stockCode,
  shares,
  onClick,
}: SellButtonsProps) => {
  const sellTodayHandler = () => {
    onClick();
    (
      document.querySelector("input[name='secCode']") as HTMLInputElement
    ).value = stockCode;
    (document.querySelector("input[name='volume']") as HTMLInputElement).value =
      `${shares}`;
    (document.querySelector("input[name='price']") as HTMLInputElement).value =
      `${price.toFixed(2)}`;
    (
      document.querySelector("input[name='expiryDate']") as HTMLInputElement
    ).value = getExpiry(0);
  };
  const getExpiry = (plus = 7) => {
    const d = new Date();
    d.setDate(d.getDate() + plus);
    const month = d.getMonth() + 1;
    return `${d.getFullYear()}${month < 10 ? `0${month}` : month}${d.getDate()}`;
  };
  const sellWeekHandler = () => {
    sellTodayHandler();
    (
      document.querySelector("input[name='expiryDate']") as HTMLInputElement
    ).value = getExpiry(6);
  };
  const sellMonthHandler = () => {
    sellTodayHandler();
    (
      document.querySelector("input[name='expiryDate']") as HTMLInputElement
    ).value = getExpiry(29);
  };
  return (
    <div className="text-sm mt-2 !border-b pb-2">
      <button onClick={sellTodayHandler} className="text-red-900">
        Sell Today
      </button>{" "}
      &middot;{" "}
      <button onClick={sellWeekHandler} className="text-red-900">
        Sell Week
      </button>{" "}
      &middot;{" "}
      <button onClick={sellMonthHandler} className="text-red-900">
        Sell Month
      </button>
    </div>
  );
};

export default SellButtons;
