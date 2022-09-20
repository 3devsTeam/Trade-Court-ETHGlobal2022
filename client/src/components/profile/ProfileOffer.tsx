import React from "react";
import { IOffer } from "../../models/models";
import { ButtonOffer } from "./ButtonOffer";
import { Arrow } from "../Arrow";
import { Cross } from "../Cross";
import { OfferService } from "../../services/offer.services";
import { Label } from "./Label";

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
  console.log(room.stage);

  return (
    <div
      className={
        "bg-white px-[20px] py-[33px] shadow-lg rounded-[20px] flex gap-5 items-center"
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
        <p className={"font-bold"}>{unitPrice}</p>
      </div>

      <div>
        <p>Available: {quantity}</p>
        <p>
          Limit: {orderLimit[0]}-{orderLimit[1]}
        </p>
      </div>

      <div>
        {room.stage === "no taker" ? (
          <ButtonOffer
            onAction={() => OfferService.deleteByID(_id)}
            image={<Cross />}
            bgColor={"bg-black"}
          />
        ) : (
          <ButtonOffer
            onAction={() => console.log("go to offer")}
            image={
              <div className={"-rotate-90"}>
                <Arrow />
              </div>
            }
            bgColor={"bg-purple"}
          />
        )}
      </div>

      <Label color={"purple"} name={room.stage} />
    </div>
  );
};
