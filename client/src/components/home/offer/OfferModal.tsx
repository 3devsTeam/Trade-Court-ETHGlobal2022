import React, { useState, useEffect } from "react";
import { truncateAddress } from "../../../utils/truncateAddress";
import { Input } from "../../create-offer/Input";
import { useNavigate } from "react-router";
import { IOffer } from "../../../models/models";
import { OfferInput } from "./OfferInput";
import { OfferService } from "../../../api/offer.services";
import { toast } from "react-toastify";
import { useEthContract } from "../../../hooks/useEthContract";
import { parseEther } from "../../../utils/parseEther";
import { round } from "../../../utils/round";

interface IOfferModalProps {
  close: any;
  offer: IOffer;
}

export const OfferModal = ({ close, offer }: IOfferModalProps) => {
  const {
    fiat,
    crypto,
    maker,
    unitPrice,
    _id,
    quantity,
    offerComment,
    minLimit,
    maxLimit,
  } = offer;

  const navigate = useNavigate();

  const [pay, setPay] = useState(0);
  const [receive, setReceive] = useState(0);

  // const { roomId } = room;

  const { ticker } = fiat;

  const { symbol } = crypto;

  const { address } = maker;

  const args = [1, parseEther(receive.toString())];
  const value = 0;
  const functionName = "completeDeal";

  const { data, prepareError, isError, isLoading, isSuccess, writeAsync } =
    useEthContract(args, functionName);

  const offerNotify = (error: string) => {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  useEffect(() => {
    setReceive(+(pay / unitPrice).toFixed(4));
  }, [pay, receive]);

  const transactionHandler = () => {
    writeAsync?.().then(() => {
      OfferService.joinByID(_id, {
        amount: pay,
      })
        .then((data) => {
          if (data.data.message === "success") {
            close();
            navigate(`/transaction/${_id}`);
          }
        })
        .catch((err) => {
          offerNotify(err.response.data.message);
        });
    });
  };

  const info = [
    {
      name: "Maker:",
      value: truncateAddress(address),
    },
    {
      name: "Unit Price:",
      value: `${unitPrice} ${ticker}`,
    },
    {
      name: "Available:",
      value: `${round(+quantity, 4)} ${symbol}`,
    },
    {
      name: "Limit:",
      value: `${minLimit}-${maxLimit} ${ticker}`,
    },
  ];

  return (
    <div className='rounded-[15px] grid grid-cols-2'>
      <div className='flex flex-col gap-3 p-3 cursor-default border-2 border-purple rounded-[20px]'>
        {info.map((h, i) => (
          <div className={"flex justify-between"} key={i}>
            <p>{h.name}</p>
            <p className={"font-bold"}>{h.value}</p>
          </div>
        ))}
        <div className='break-words bg-purple bg-opacity-20 p-2 rounded-[10px]'>
          <p className={"text-sm"}>{offerComment}</p>
        </div>
      </div>

      <div className='flex flex-col gap-[10px] px-3'>
        <OfferInput
          label={"You pay"}
          maxValue={maxLimit}
          setValue={setPay}
          placeholder={"You pay"}
          value={pay}
          inputContent={ticker}
        />
        <OfferInput
          readOnly={false}
          label={"You receive"}
          setValue={setReceive}
          placeholder={"You receive"}
          value={receive}
          inputContent={symbol}
        />
        <div>
          <button
            onClick={() => transactionHandler()}
            className='bg-purple font-bold p-2 rounded-[20px] w-full h-[55px]'
          >
            <span className='text-white'>Buy {symbol}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
