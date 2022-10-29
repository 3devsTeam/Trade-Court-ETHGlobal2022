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
  deletePayment: any;
}

export const Payment = ({
  payment,
  setActive,
  active,
  deletePayment,
}: IPaymentButton) => {
  const { paymentMethod, cardNumber, id } = payment;
  return (
    <button
      type='button'
      onClick={() => setActive(payment)}
      className={`flex items-center w-full p-3 rounded-[15px] inputBorder relative`}
    >
      <div className={`flex space-x-2 items-center`}>
        <img
          className={"w-8 h-8 rounded-full border border-purple object-cover"}
          src={paymentMethod.logoUrl}
          alt={""}
        />
        <span className={"font-bold"}>{sliceCardNumber(cardNumber)}</span>
      </div>
      <div className='absolute right-3'>
        <CloseButton onAction={() => deletePayment(id)} />
      </div>
    </button>
  );
};
