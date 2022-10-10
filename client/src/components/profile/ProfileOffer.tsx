import React from "react";
import { IOffer } from "../../models/models";
import { ButtonOffer } from "./ButtonOffer";
import { Arrow } from "../ui/icons/Arrow";
import { Cross } from "../ui/icons/Cross";
import { OfferService } from "../../api/offer.services";
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
        "bg-white px-[20px] py-[33px] rounded-[20px] grid grid-cols-profileOffer items-center relative shadow-customDark"
      }
    >
      <div>
        <p className={"font-bold"}>#{parseInt(_id.slice(-3), 16)}</p>
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
