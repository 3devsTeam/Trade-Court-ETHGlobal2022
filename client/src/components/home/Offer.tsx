import React, { forwardRef, useRef, useState } from 'react'
import { truncateAddress } from '../../utils/truncateAddress'
import OfferModal from './OfferModal'
import { Modal } from '../ui/Modal'
import { IOffer } from '../../types/interfaces/offer.interface'

export const Offer = forwardRef<any, any>((offer: IOffer, ref) => {
  const { _id, crypto, fiat, maker, minLimit, maxLimit, payMethods, quantity, unitPrice } = offer
  const payments = payMethods?.map((e: any) => e.bank.name)
  const { address } = maker
  const { symbol } = crypto
  const { ticker } = fiat
  const [isOpen, setIsOpen] = useState(false)

  const offerBody = (
    <div className="flex bg-white py-6 px-4 shadow-customDark w-full rounded-[20px]">
      <div className="flex items-center w-full">
        <div className="flex-1">
          <span className="font-bold text-purple">{truncateAddress(address)}</span>
        </div>

        <div className="flex-1">
          <span className="font-bold">
            {unitPrice} <span className="font-normal">{ticker}</span>
          </span>
        </div>

        <div className="flex-[2_0]">
          <div>
            <div>
              <span>
                Available:{' '}
                <span className={'font-bold'}>
                  {parseFloat(quantity.toString()).toFixed(4)} {symbol}
                </span>
              </span>
            </div>
            <div>
              <span>
                Limit:{' '}
                <span className={'font-bold'}>
                  {minLimit}-{maxLimit} {ticker}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {payments.map((payment: string, i: number) => (
            <div key={i} className={'text-sm font-bold'}>
              {payment}
            </div>
          ))}
        </div>

        <div className="flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-green text-lg text-white rounded-[10px] font-bold p-[6px]
            transition-all duration-500 hover:bg-lightGreen w-full">
            Buy {symbol}
          </button>
        </div>
      </div>

      {isOpen ? (
        <Modal header={'Transaction'} close={() => setIsOpen(false)}>
          <OfferModal close={() => setIsOpen(false)} offer={offer} />
        </Modal>
      ) : null}
    </div>
  )

  return ref ? (
    <div className="w-full" ref={ref}>
      {offerBody}
    </div>
  ) : (
    <div className="w-full">{offerBody}</div>
  )
})
