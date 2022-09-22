import React from "react";
import { IOffer } from "../../models/models";
import { ButtonOffer } from "./ButtonOffer";
import { Arrow } from "../Arrow";
import { Cross } from "../Cross";
import { OfferService } from "../../services/offer.services";
import { Label } from "./Label";
import { useNavigate } from "react-router-dom";

export const ProfileOffer = ({
  _id,
  offerType,
  fiat,
  crypto,
  unitPrice,
  quantity,
  orderLimit,
  payMethods,
  room,
}: IOffer) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        "bg-white px-[20px] py-[33px] shadow-lg rounded-[20px] grid grid-cols-profileOffer items-center relative"
      }
    >
      <div>
        <p className={"font-bold"}>#{parseInt(_id.slice(-4), 10)}</p>
      </div>

      <div>
        <p
          className={`text-lg font-bold ${
            offerType === "buy"
              ? "text-green"
              : offerType === "sell"
              ? "text-red-500"
              : ""
          }`}
        >
          {offerType === "buy"
            ? "Buy crypto"
            : offerType === "sell"
            ? "Sell crypto"
            : ""}
        </p>
      </div>

      <div>
        <span className={"font-bold"}>
          {crypto.symbol}/{fiat.ticker}
        </span>
      </div>

      <div>
        <p className={"font-bold"}>
          {unitPrice} {fiat.ticker}
        </p>
      </div>

      <div>
        <p className={"text-sm"}>
          Available: {quantity} {crypto.symbol}
        </p>
        <p className={"text-sm"}>
          Limit: {orderLimit[0]}-{orderLimit[1]} {fiat.ticker}
        </p>
      </div>

      <div>
        {payMethods.map((e) => (
          <p className={"font-bold text-sm"} key={e._id}>
            {e.bank.name}
          </p>
        ))}
      </div>

      <div>
        {/* <div className={"absolute -top-2 right-0"}>
          <ButtonOffer
            onAction={() => OfferService.deleteByID(_id)}
            image={<Cross />}
            bgColor={"bg-black"}
          />
        </div>
        <ButtonOffer
          onAction={() => navigate(`/transaction/${_id}`)}
          image={
            <div className={"-rotate-90"}>
              <Arrow />
            </div>
          }
          bgColor={"bg-purple"}
        /> */}
        {room!.stage === "no taker" ? (
          <ButtonOffer
            onAction={() => OfferService.deleteByID(_id)}
            image={<Cross />}
            bgColor={"bg-black"}
          />
        ) : (
          <ButtonOffer
            onAction={() => navigate(`/transaction/${_id}`)}
            image={
              <div className={"-rotate-90"}>
                <Arrow />
              </div>
            }
            bgColor={"bg-purple"}
          />
        )}
      </div>

      <Label color={"purple"} name={room!.stage} />
    </div>
  );
};
