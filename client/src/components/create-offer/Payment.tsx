import React, { useState } from "react";
import { sliceCardNumber } from "../../utils/sliceCardNumber";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { CloseButton } from "../ui/CloseButton";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IPayment } from "../../models/models";

interface IPaymentButton {
  id: string;
  payment: IPayment;
  setActive: any;
  active: string | undefined;
  deletePayment: (id: string) => void;
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
      className={`flex justify-between items-center p-2 rounded-[15px] inputBorder w-full`}
    >
      <div className='flex items-center space-x-2'>
        <img
          className={"w-8 h-8 rounded-full object-cover"}
          src={paymentMethod.logoUrl}
          alt={""}
        />
        <span>{paymentMethod.name}</span>
        <span className={"font-bold"}>{cardNumber}</span>
      </div>

      <CloseButton onAction={() => deletePayment(id)} />
    </button>
  );
};
