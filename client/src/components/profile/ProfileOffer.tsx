import React, { useEffect, useState } from 'react'
import { Arrow } from '../ui/icons/Arrow'
import { Cross } from '../ui/icons/Cross'
import { OfferService } from '../../api/offer.services'
import { Label } from './Label'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { SkeletonWrapper } from '../ui/SkeletonWrapper'
import { Modal } from '../ui/Modal'
import { useMutation } from '@tanstack/react-query'
import { totalAmount } from '../../utils/totalAmount'
import { IPayment } from '../../types/interfaces/payment.interface'
import { IOffer } from '../../types/interfaces/offer.interface'
import { IProfileOffer } from '../../types/interfaces/profile-offer.interface'

interface Props {
  offer: IProfileOffer
  refetch: () => Promise<any>
}

export const ProfileOffer: React.FC<Props> = ({ offer, refetch }) => {
  const {
    _id,
    maker,
    offerType,
    unitPrice,
    amount,
    quantity,
    minLimit,
    maxLimit,
    payMethods,
    crypto,
    fiat,
    totalAmount
  } = offer

  const handleDelete = useMutation(() => OfferService.deleteByID(_id))

  const [open, setOpen] = useState(false)

  useEffect(() => {
    refetch!()
    setOpen(false)
  }, [handleDelete.isSuccess])
  // grid-cols-offer
  return (
    <div className="flex justify-between items-center bg-white shadow-customDark rounded-[20px] p-5">
      <div>
        <span className="text-purple">{_id}</span>
      </div>

      <div>
        <span
          className={`font-bold ${
            offerType === 'buy' ? 'text-lightGreen' : 'text-red-400'
          }`}>{`${offerType?.[0].toUpperCase()}${offerType?.slice(1)}`}</span>
      </div>

      <div>
        <span>
          {unitPrice} {fiat?.ticker}
        </span>
      </div>

      <div>
        <span className="font-bold">
          {crypto.symbol}/{fiat.ticker}
        </span>
      </div>

      <div>
        {payMethods.map((payment: IPayment) => (
          <div>
            <span>{payment.bank.name}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        <span className="font-bold">
          {amount}/{totalAmount} {crypto.symbol}
        </span>
        <span className="font-bold">{(amount / totalAmount) * 100}%</span>
      </div>

      <div>
        <Button onClick={() => setOpen(true)} color="bg-black" icon={<Cross />} />
      </div>

      {open ? (
        <Modal close={() => setOpen(false)} header={'Delete this Offer?'}>
          <button
            onClick={() => handleDelete.mutate()}
            disabled={handleDelete.isLoading}
            className="text-white p-2 w-full rounded-lg bg-red-500 font-bold hover:opacity-70">
            {handleDelete.isLoading ? 'Deleting Offer...' : 'Delete'}
          </button>
        </Modal>
      ) : null}
    </div>
  )
}
