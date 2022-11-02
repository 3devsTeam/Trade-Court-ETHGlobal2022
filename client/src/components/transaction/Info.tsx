import React from 'react'
import { IOffer } from '../../types/models'
import { round } from '../../utils/round'

export const Info = ({ fiat, crypto, amount, unitPrice, quantity, room }: IOffer) => {
  const roomAmount = room?.amount

  return (
    <div
      className={
        'bg-white flex justify-between h-[100px] shadow-lg rounded-[20px] items-center px-[20px] py-[12px]'
      }>
      <div className={'flex flex-col'}>
        <div>
          <span className={'text-lg font-bold'}>You send </span>
          <span className={'text-lg font-bold text-purple'}>{fiat.ticker}</span>
        </div>
        <div>
          <span className={'text-lg font-bold'}>You send </span>
          <span className={'text-lg font-bold text-purple'}>{crypto.symbol}</span>
        </div>
      </div>

      <div className={'flex flex-col'}>
        <span className={'text-lg font-bold'}>Amount</span>
        <span className={'text-lg font-bold text-purple'}>
          {roomAmount} {fiat.ticker}
        </span>
      </div>

      <div className={'flex flex-col'}>
        <span className={'text-lg font-bold'}>Unit Price</span>
        <span className={'text-lg font-bold text-purple'}>
          {unitPrice} {fiat.ticker}
        </span>
      </div>

      <div className={'flex flex-col'}>
        <span className={'text-lg font-bold'}>Quantity</span>
        <span className={'text-lg font-bold text-purple'}>
          {round(roomAmount / unitPrice, 4)} {crypto.symbol}
        </span>
      </div>
    </div>
  )
}
