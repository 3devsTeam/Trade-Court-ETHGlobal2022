import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { multiply } from "../../utils/multiply";
import { IPayments } from "../../models/models";

export const Preview = () => {
  const {
    crypto,
    fiat,
    unitPrice,
    quantity,
    timeLimit,
    priceLimit,
    comment,
    paymentMethods,
  } = useTypedSelector((state) => state.offerReducer);

  const { symbol, logoUrl: cryptoImage } = crypto;

  const { ticker, logoUrl: fiatImage } = fiat;

  return (
    <div className={"bg-white rounded-[20px] shadow-lg row-span-2 break-words"}>
      <div className={"bg-purple rounded-t-[20px] p-5"}>
        <p className={"text-white text-[32px] font-bold"}>Preview</p>
      </div>

      <div className={"flex flex-col gap-5 p-5"}>
        <div className={"flex items-center justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Crypto</span>
          </div>
          <div className={"flex gap-1 items-center"}>
            <img className={"w-8 h-8"} src={cryptoImage} alt={""} />
            <span>{symbol}</span>
          </div>
        </div>

        <div className={"flex justify-between items-center"}>
          <div>
            <span className={"font-bold text-lg"}>Fiat</span>
          </div>
          <div className={"flex gap-1 items-center"}>
            <img
              className={
                "w-8 h-8 rounded-[50%] border border-purple object-cover"
              }
              src={fiatImage}
              alt={""}
            />
            <span>{ticker}</span>
          </div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Unit Price</span>
          </div>
          <div>
            <span>{unitPrice}</span>
            <span> {ticker}</span>
          </div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Quantity</span>
          </div>
          <div>
            <span>
              {quantity} {symbol}
            </span>
          </div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Total Amount</span>
          </div>
          <div>
            <span>{multiply(unitPrice, quantity)}</span>
            <span> {ticker}</span>
          </div>
        </div>

        <hr />

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Payment Methods</span>
          </div>
          <div>
            {paymentMethods.length
              ? paymentMethods.map((p) => {
                  console.log(p);
                  return (
                    <div className={"flex items-center gap-1 my-2"}>
                      <img
                        className={
                          "w-8 h-8 rounded-[50%] border border-purple object-cover"
                        }
                        src={p.paymentMethod.logoUrl}
                        alt=""
                      />
                      <p>{p.paymentMethod.name}</p>
                    </div>
                  );
                })
              : "-"}
          </div>
        </div>

        <hr />

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Time Limit</span>
          </div>
          <div>
            <span>{timeLimit} min</span>
          </div>
        </div>

        <div className={"flex justify-between"}>
          <div>
            <span className={"font-bold text-lg"}>Price Limit</span>
          </div>
          <div>
            <span>{`${priceLimit[0]}-${priceLimit[1]}`}</span>
          </div>
        </div>

        <div className={"flex justify-between gap-5"}>
          <div>
            <span className={"font-bold text-lg"}>Comment</span>
          </div>
          <div>
            <p>{comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
