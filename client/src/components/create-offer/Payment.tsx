import React, { useState } from "react";
import { sliceCardNumber } from "../../utils/sliceCardNumber";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { CloseButton } from "../ui/CloseButton";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IPayment } from "../../models/models";

interface IPaymentButton {
  payment: IPayment;
  showCloseButton: boolean;
}

export const Payment = ({ payment, showCloseButton }: IPaymentButton) => {
  console.log(payment);
  const { cardNumber, paymentMethod } = payment;

  return (
    <div
      className='px-[10px] py-[15px] h-[60px] w-[220px] rounded-[15px] border-2 border-purple flex gap-1 justify-between items-center'
      key={cardNumber}
    >
      <img
        className={"w-8 h-8 rounded-[50%] border border-purple object-cover"}
        src={paymentMethod.logoUrl}
        alt={""}
      />
      <span className={"font-bold"}>{sliceCardNumber(cardNumber)}</span>
      {showCloseButton && <CloseButton onClose={null} />}
    </div>
  );
};
