import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface Props {
  offer: any
}

export const TransactionInfo: React.FC<Props> = ({ offer }) => {
  const { role } = useTypedSelector((state) => state.transactionReducer)

  const displayExchange = () => {
    switch (role) {
      case 'taker':
        return (
          <>
            <span className="text-gray-300">
              You send
              <span className="text-black"> {offer.fiat.ticker}</span>
            </span>
            <span className="text-gray-300">
              You recieve
              <span className="text-black"> {offer?.crypto.symbol}</span>
            </span>
          </>
        )
      case 'maker':
        return (
          <>
            <span className="text-gray-300">
              You send
              <span className="text-black"> {offer?.crypto.symbol}</span>
            </span>
            <span className="text-gray-300">
              You recieve
              <span className="text-black"> {offer.fiat.ticker}</span>
            </span>
          </>
        )
    }
  }

  return (
    <div className="flex justify-between items-center p-5 font-bold wrapper">
      <div className="flex flex-col">{displayExchange()}</div>
      <div>
        <span>
          Amount: {offer?.totalAmount} {offer?.fiat.ticker}
        </span>
      </div>
      <div>
        <span>
          Unit Price: {offer?.unitPrice} {offer?.fiat.ticker}
        </span>
      </div>
      <div>
        Quantity: {offer?.totalQuantity} {offer?.crypto.symbol}
      </div>
    </div>
  )
}
