import React from 'react'
import { IActiveOffer } from '../../types/interfaces/active-offer.interface'
import { uperCaseFirstLetter } from '../../utils/upercaseFirstLetter'
import { Button } from '../ui/Button'
import { Arrow } from '../ui/icons/Arrow'

interface Props {
  activeOffer: IActiveOffer
}

export const ActiveOffer: React.FC<Props> = ({ activeOffer }) => {
  const { _id, offer, banks, crypto, fiat, stage } = activeOffer

  const { ticker } = fiat[0]
  const { symbol } = crypto[0]

  const { offerType, unitPrice } = offer[0]

  return (
    <div className="flex justify-between items-center bg-white shadow-customDark rounded-[20px] p-5">
      <div>
        <span className="text-purple">{_id}</span>
      </div>

      <div>
        <span className={`font-bold ${offerType === 'buy' ? 'text-lightGreen' : 'text-red-400'}`}>
          {uperCaseFirstLetter(offerType!)}
        </span>
      </div>

      <div>
        <span>
          {unitPrice} {ticker}
        </span>
      </div>

      <div>
        <span className="font-bold">
          {symbol}/{ticker}
        </span>
      </div>

      <div>
        {banks.map((payment) => (
          <div>
            <span>{payment.name}</span>
          </div>
        ))}
      </div>

      <div>
        <span>{uperCaseFirstLetter(stage)}</span>
      </div>

      <div>
        <Button
          onClick={() => {}}
          color="bg-purple"
          icon={
            <div className="-rotate-90 text-white">
              <Arrow />
            </div>
          }
        />
      </div>
    </div>
  )
}
