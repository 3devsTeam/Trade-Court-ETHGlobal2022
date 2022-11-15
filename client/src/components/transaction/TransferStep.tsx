import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IPayment } from '../../types/interfaces/payment.interface'
import { Payment } from './Payment'
import { WarningMessage } from './WarningMessage'
import { v4 as uuid } from 'uuid'

interface Props {
  payMethods: IPayment[]
}

export const TransferStep: React.FC<Props> = ({ payMethods }) => {
  const { selectedPayment } = useTypedSelector((state) => state.transactionReducer)

  const { cardNumber, region, bank, paymentDescription } = selectedPayment

  return (
    <div>
      <div className="flex space-x-2 items-center overflow-x-auto mb-4">
        {payMethods.map((payment) => (
          <Payment payment={payment} key={uuid()} />
        ))}
      </div>

      <div className="flex flex-col gap-y-[10px] font-bold">
        <div className="flex flex-col">
          <span className="text-gray-300 text-xs">Bank</span>
          <span>{bank.name}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-300 text-xs">Region</span>
          <span>{region.name}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-300 text-xs">Card Number</span>
          <span>{cardNumber}</span>
        </div>

        {paymentDescription ? (
          <div className="flex flex-col">
            <span className="text-gray-300 text-xs">Payment Description</span>
            <span>{paymentDescription}</span>
          </div>
        ) : null}

        <WarningMessage />
      </div>
    </div>
  )
}
