import React, { useState } from "react";
import { sliceCardNumber } from "../../utils/sliceCardNumber";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { CloseButton } from "../ui/CloseButton";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IPayment } from "../../models/models";

interface IPaymentButton {
  payment: IPayment;
  setActive: any;
  active: string | undefined;
}

export const Payment = ({ payment, setActive, active }: IPaymentButton) => {
  const { paymentMethod, cardNumber, id } = payment;

  const { removePaymentMethod } = useActions();

  const activePayment = active === id ? "border-2 border-purple" : "";
  return (
    <div
      className={`${activePayment} h-[60px] elementBorder p-2 flex gap-2 cursor-pointer`}
    >
      <div
        onClick={() => setActive(payment)}
        className={` flex gap-1 justify-between items-center`}
      >
        <img
          className={"w-8 h-8 rounded-full border border-purple object-cover"}
          src={paymentMethod.logoUrl}
          alt={""}
        />
        <span className={"font-bold"}>{sliceCardNumber(cardNumber)}</span>
      </div>
      <CloseButton onAction={() => removePaymentMethod(id)} />
    </div>
  );
};
