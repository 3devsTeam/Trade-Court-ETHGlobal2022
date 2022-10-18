import React, { useState } from "react";
import { sliceCardNumber } from "../../utils/sliceCardNumber";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { CloseButton } from "../ui/CloseButton";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IPayment } from "../../models/models";
import { PenIcon } from "../ui/icons/PenIcon";
import { Modal } from "../ui/Modal";

interface IPaymentButton {
  payment: IPayment;
}

export const Payment = ({ payment }: IPaymentButton) => {
  const [open, setOpen] = useState(false);

  const { paymentMethod, cardNumber, id } = payment;

  const { removePaymentMethod } = useActions();

  const [newCardNumber, setNewCardNumber] = useState(cardNumber);

  const submitChanges = () => {
    const newPayment: IPayment = {
      id: id,
      cardNumber: newCardNumber,
      // paymentDescription: "",
      // paymentMethod: ,
      // region: undefined
    };
  };

  const deletePayment = () => {
    removePaymentMethod(id);
  };

  return (
    <div className='px-[10px] py-[15px] h-[60px] rounded-[15px] border-2 border-purple flex gap-1 justify-between items-center'>
      <img
        className={"w-8 h-8 rounded-[50%] border border-purple object-cover"}
        src={paymentMethod.logoUrl}
        alt={""}
      />
      <span className={"font-bold"}>{sliceCardNumber(cardNumber)}</span>
      <button
        onClick={() => setOpen(!open)}
        type='button'
        className='bg-gray-300 p-2 rounded-lg'
      >
        Edit
      </button>

      <Modal
        isOpen={open}
        close={() => setOpen(false)}
        header={"Edit Payment Method"}
      >
        <form className='flex flex-col'>
          <label>
            Card Number
            <input
              value={newCardNumber}
              onChange={(e) => setNewCardNumber(e.target.value)}
            />
          </label>

          <button onClick={() => submitChanges()} type='button'>
            Ok
          </button>
          <button onClick={() => deletePayment()} type='button'>
            Delete
          </button>
        </form>
      </Modal>
    </div>
  );
};
