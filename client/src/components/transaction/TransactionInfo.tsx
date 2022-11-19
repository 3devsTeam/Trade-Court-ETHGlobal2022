import React from 'react'

interface Props {
  offer: any
}

export const TransactionInfo: React.FC<Props> = ({ offer }) => {
  return (
    <div className="flex justify-between items-center p-5 font-bold wrapper">
      <div className="flex flex-col">
        <span>You recieve: {offer?.crypto.symbol}</span>
        <span>You send: {offer.fiat.ticker}</span>
      </div>
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
