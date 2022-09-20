import React, { useState, useEffect } from "react";
import { truncateAddress } from "../../utils/truncateAddress";
import { Input } from "../create-offer/Input";
import { useNavigate } from "react-router";
import { IOffer } from "../../models/models";
import { OfferInput } from "../home/OfferInput";
import { OfferService } from "../../services/offer.services";

import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// console.log(toast);

export const OfferModal = ({
  _id,
  unitPrice,
  fiat,
  maker,
  orderLimit,
  amount,
  crypto,
  quantity,
  offerComment,
}: IOffer) => {
  //const offerNotify = () => toast("you fucked up somewhere");

  //console.log("id", _id);

  const [pay, setPay] = useState(0);
  const [recieve, setRecieve] = useState(0);

  const { ticker } = fiat;

  const { symbol } = crypto;

  const { address } = maker;

  const navigate = useNavigate();

  useEffect(() => {
    setRecieve(+(pay / unitPrice).toFixed(2));
  }, [pay, recieve]);

  const transactionHandler = () => {
    OfferService.joinByID(_id, {
      amount: pay,
    })
      .then((data) => {
        if (data.data.status === "success") {
          navigate(`/transaction/${_id}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="border-2 border-purple rounded-[15px] grid grid-cols-2">
      <div className="flex flex-col gap-3 p-3 cursor-default">
        <div className={"flex justify-between"}>
          <p className={"font-bold"}>Maker:</p>
          <p>{truncateAddress(address)}</p>
        </div>
        <div className={"flex justify-between"}>
          <p className={"font-bold"}>Unit Price: </p>
          <p>
            {unitPrice} {ticker}
          </p>
        </div>
        <div className={"flex justify-between"}>
          <p className={"font-bold"}>Available: </p>
          <p>
            {quantity} {symbol}
          </p>
        </div>
        <div className={"flex justify-between"}>
          <p className={"font-bold"}>Limit: </p>
          <p>
            {orderLimit[0]}-{orderLimit[1]} {ticker}
          </p>
        </div>
        <div className="break-words bg-slate-100 p-2 rounded-[20px]">
          <p>{offerComment}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-l border-gray p-3 ">
        <OfferInput
          label={"You pay"}
          maxValue={orderLimit[1]}
          setValue={setPay}
          placeholder={"You pay"}
          value={pay}
          inputContent={ticker}
        />
        <OfferInput
          readOnly={true}
          label={"You recieve"}
          maxValue={quantity}
          setValue={setRecieve}
          placeholder={"You recieve"}
          value={recieve}
          inputContent={symbol}
        />
        <div>
          <button
            onClick={() => transactionHandler()}
            className="bg-purple font-bold p-2 shadow-md rounded-[10px] w-full"
          >
            <span className="text-white">Buy {symbol}</span>
          </button>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};
