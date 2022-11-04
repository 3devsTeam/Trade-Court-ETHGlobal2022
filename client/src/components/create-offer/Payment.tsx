import React, { Dispatch, SetStateAction, useState } from 'react'
import { CloseButton } from '../ui/CloseButton'
import { IPayment } from '../../types/interfaces/payment.interface'

interface Props {
  payment: IPayment
  setActive: Dispatch<SetStateAction<IPayment>>
  deletePayment: (id: string) => void
}

export const Payment = ({ payment, setActive, deletePayment }: Props) => {
  const { paymentMethod, cardNumber, id } = payment
  return (
    <button
      type="button"
      onClick={() => setActive(payment)}
      className={`flex justify-between items-center p-2 rounded-[15px] inputBorder w-full`}>
      <div className="flex items-center space-x-2">
        <img className={'w-8 h-8 rounded-full object-cover'} src={paymentMethod.logoUrl} alt={''} />
        <span>{paymentMethod.name}</span>
        <span className={'font-bold'}>{cardNumber}</span>
      </div>

      <CloseButton onAction={() => deletePayment(id)} />
    </button>
  )
}
