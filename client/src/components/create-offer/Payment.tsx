import React, { useState } from "react";
import { sliceCardNumber } from "../../utils/sliceCardNumber";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { CloseButton } from "../ui/CloseButton";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IPayment } from "../../models/models";
import { PenIcon } from "../ui/icons/PenIcon";
import { Modal } from "../ui/Modal";
import { Input } from "./Input";
import { Button } from "../ui/Button";

interface IPaymentButton {
  payment: IPayment;
}

export const Payment = ({ payment }: IPaymentButton) => {
  const { paymentMethod, cardNumber, id } = payment;

  // const { removePaymentMethod } = useActions();

  return (
    <button
      type='button'
      className='px-[10px] py-[15px] h-[60px] flex gap-1 justify-between items-center elementBorder'
    >
      <img
        className={"w-8 h-8 rounded-[50%] border border-purple object-cover"}
        src={paymentMethod.logoUrl}
        alt={""}
      />
      <span className={"font-bold"}>{sliceCardNumber(cardNumber)}</span>
      {/* <CloseButton onAction={() => removePaymentMethod(id)} /> */}
    </button>
  );
};
