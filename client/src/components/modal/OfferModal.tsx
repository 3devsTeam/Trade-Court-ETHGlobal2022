import React, { useState, useEffect } from "react";
import { truncateAddress } from "../../utils/truncateAddress";
import { Input } from "../create-offer/Input";
import { useNavigate } from "react-router";
import { IOffer } from "../../models/models";
import { OfferInput } from "../home/OfferInput";

export const OfferModal = ({
  unitPrice,
  fiat,
  maker,
  orderLimit,
  amount,
  crypto,
  quantity,
  offerComment,
}: IOffer) => {
  const [pay, setPay] = useState(0);
  const [recieve, setRecieve] = useState(0);

  const { ticker } = fiat;

  const { symbol } = crypto;

  const { address } = maker;

  const navigate = useNavigate();

  useEffect(() => {
    setRecieve(+(pay / unitPrice).toFixed(2));
  }, [pay, recieve]);

  return (
    <div className="border-2 border-purple rounded-[15px] grid grid-cols-2">
      <div className="flex flex-col gap-3 p-3 cursor-default">
        <div className={"flex justify-between"}>
          <p>Maker:</p>
          <p>{truncateAddress(address)}</p>
        </div>
        <div className={"flex justify-between"}>
          <p>Unit Price: </p>
          <p>
            {unitPrice} {ticker}
          </p>
        </div>
        <div className={"flex justify-between"}>
          <p>Available: </p>
          <p>
            {quantity} {symbol}
          </p>
        </div>
        <div className={"flex justify-between"}>
          <p>Limit: </p>
          <p>
            {orderLimit[0]}-{orderLimit[1]} {ticker}
          </p>
        </div>
        <div className="break-words">
          <p>{offerComment}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-l border-gray p-3 ">
        <OfferInput
          maxValue={orderLimit[1]}
          setValue={setPay}
          placeholder={"You pay"}
          value={pay}
          inputContent={ticker}
        />
        <OfferInput
          maxValue={quantity}
          setValue={setRecieve}
          placeholder={"You recieve"}
          value={recieve}
          inputContent={symbol}
        />
        <div>
          <button
            onClick={() => navigate("/transaction")}
            className="bg-purple font-bold p-2 shadow-md rounded-[10px] w-full"
          >
            <span className="text-white">Buy {symbol}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
