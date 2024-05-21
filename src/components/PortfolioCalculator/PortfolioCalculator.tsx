import { useRef, useState } from "react";
import SellButtons from "./SellButtons";
import { convertCurrency } from "../../utils/convertCurrency";
import { removeComma } from "../../utils/removeComma";
import { useContainerDetection } from "../../hooks/useContainerDetection";

export const PortfolioCalculator = () => {
  const [show, setShow] = useState(false);
  const targetElement = useRef<HTMLElement>();
  useContainerDetection("portfolio-container", () => {
    if (targetElement.current) return;
    const clickHandler = (e: Event) => {
      targetElement.current = e.target as HTMLElement;
      setShow(!show);
    };
    for (const col of document.getElementsByClassName("col-utotalcost")) {
      col.addEventListener("click", clickHandler);
    }
    return () => {
      for (const col of document.getElementsByClassName("col-utotalcost")) {
        col.removeEventListener("click", clickHandler);
      }
    };
  });

  const onModalClose = () => {
    setShow(false);
  };
  const convertToAmount = (a: string) => parseFloat(removeComma(a));
  const totalCost = targetElement.current?.innerText ?? "";
  const totalShares =
    targetElement.current?.parentElement?.querySelector(".col-ushares")
      ?.textContent ?? "";
  const stockCode =
    targetElement.current?.parentElement?.querySelector(".col-ustock")
      ?.textContent ?? "";
  const withMarkup10 = convertToAmount(totalCost) * 1.11;
  const withMarkup5 = convertToAmount(totalCost) * 1.06;
  const totalSharesNum = convertToAmount(totalShares);
  const sellingPrice10 = withMarkup10 / totalSharesNum;
  const sellingPrice5 = withMarkup5 / totalSharesNum;
  const income10 = withMarkup10 - convertToAmount(totalCost);
  const income5 = withMarkup5 - convertToAmount(totalCost);

  const sellHandler = () => {
    const sellButtons = targetElement.current?.parentElement?.querySelector(
      "span.dnColor.pointer",
    );
    if (sellButtons) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      for (const button of sellButtons) {
        if (button.textContent === "SELL") {
          button.click();
        }
      }
    }
  };

  return (
    show && (
      <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[9999] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div
          className="bg-gray-50 opacity-50 fixed top-0 right-0 left-0 w-full h-full"
          onClick={onModalClose}
        ></div>
        <div className="relative p-4 w-full max-w-md max-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={onModalClose}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-left flex flex-col gap-4 !pr-12">
              <div>
                <div>Stock Code</div>
                <div className="font-bold">{stockCode}</div>
              </div>
              <div>
                <div>Total Cost</div>
                <div className="font-bold">
                  {convertCurrency(convertToAmount(totalCost))}
                </div>
              </div>
              <div>
                <div>Total Shares</div>
                <div className="font-bold">{totalShares}</div>
              </div>
              <div>
                <div>10% Markup</div>
                <div className="font-bold">
                  Total: {convertCurrency(withMarkup10)}
                </div>
                <div className="font-bold">
                  Income: {convertCurrency(income10)}
                </div>
                <div className="font-bold">
                  Selling Price: {convertCurrency(sellingPrice10)}
                </div>
                <SellButtons
                  price={sellingPrice10}
                  stockCode={stockCode}
                  shares={totalSharesNum}
                  onClick={sellHandler}
                />
              </div>
              <div>
                <div>5% Markup</div>
                <div className="font-bold">
                  Total: {convertCurrency(withMarkup5)}
                </div>
                <div className="font-bold">
                  Income: {convertCurrency(income5)}
                </div>
                <div className="font-bold">
                  Selling Price: {convertCurrency(sellingPrice5)}
                </div>
                <SellButtons
                  price={sellingPrice5}
                  stockCode={stockCode}
                  shares={totalSharesNum}
                  onClick={sellHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
