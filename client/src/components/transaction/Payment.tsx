import React from 'react'
import { useActions } from '../../hooks/useActions'
import { IPayment } from '../../types/interfaces/payment.interface'

interface Props {
  payment: IPayment
}

export const Payment: React.FC<Props> = ({ payment }) => {
  const { setSelectedPayment } = useActions()

  return (
    <button
      onClick={() => setSelectedPayment(payment)}
      className="flex items-center p-[10px] rounded-[15px] border font-bold inputBorder"
    >
      <img src={payment?.bank?.logoUrl} className="w-8 h-8" />
      {payment?.bank?.name}
    </button>
  )
}
