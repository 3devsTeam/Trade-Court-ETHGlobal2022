import React, { FC } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface Props {
  offer: any
}

export const TransactionInfo: FC<Props> = ({ offer }) => {
  const { role } = useTypedSelector((state) => state.transactionReducer)

  return (
    <div className="flex items-center p-5 font-bold wrapper">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <span>
            You send:{' '}
            <span className="text-purple">
              {role === 'taker' ? offer?.fiat.ticker : offer?.crypto.symbol}
            </span>
          </span>
          <span>
            You recieve:{' '}
            <span className="text-purple">
              {role === 'taker' ? offer?.crypto.symbol : offer?.fiat.ticker}
            </span>
          </span>
        </div>
        <div className="flex flex-col">
          <span>Amount</span>
          <span className="text-purple">
            {offer?.totalAmount} {offer?.fiat.ticker}
          </span>
        </div>
        <div className="flex flex-col">
          <span>Unit Price</span>
          <span className="text-purple">
            {offer?.unitPrice} {offer?.fiat.ticker}
          </span>
        </div>
        <div className="flex flex-col">
          <span>Quantity</span>
          <span className="text-purple">
            {offer?.totalQuantity} {offer?.crypto.symbol}
          </span>
        </div>
      </div>
    </div>
  )
}
