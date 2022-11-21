import React, { useState, useEffect } from 'react'
import { truncateAddress } from '../../utils/truncateAddress'
import { NumericalInput } from '../create-offer/NumericalInput'
import { IOffer } from '../../types/interfaces/offer.interface'
import { ButtonDisabled } from '../ui/ButtonDisabled'
import { useJoinRoom } from '../../hooks/useJoinRoom'
import { AvatarIcon } from '../ui/icons/AvatarIcon'
import { ExchangeArrows } from '../ui/icons/ExchangeArrows'
import { Button } from '../ui/Button'

interface Props {
  close: any
  offer: IOffer
}

const OfferModal: React.FC<Props> = ({ close, offer }) => {
  const {
    fiat,
    crypto,
    maker,
    unitPrice,
    _id,
    quantity,
    offerComment,
    minLimit,
    maxLimit,
    roomId,
    totalAmount
  } = offer

  const [pay, setPay] = useState('0')
  const [recieve, setRecieve] = useState('0')

  const { ticker } = fiat

  const { symbol } = crypto

  const { address } = maker

  const { data, txStatus, prepareTxStatus, handleTransaction } = useJoinRoom(
    roomId,
    recieve,
    pay,
    _id
  )

  useEffect(() => {
    setRecieve((+pay / +unitPrice).toString())
  }, [pay, recieve])

  const txData = [
    {
      name: 'Amount',
      value: `${totalAmount} ${ticker}`
    },
    {
      name: 'Available:',
      value: `${quantity.toString().slice(0, 8)} ${symbol}`
    },
    {
      name: 'Limit:',
      value: `${minLimit}-${maxLimit} ${ticker}`
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2 mb-3 p-2">
          <AvatarIcon color={address} />
          <span className="font-bold">{truncateAddress(address)}</span>
        </div>
        <div className="flex flex-col gap-y-[6px] p-2">
          {txData.map((t) => (
            <div className="flex justify-between font-bold">
              <span className="text-gray-300">{t.name}</span>
              <span>{t.value}</span>
            </div>
          ))}
          <div className="h-[20vh] overflow-auto">{offerComment}</div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-2">
        <div className="flex flex-col gap-y-2">
          <NumericalInput
            onUserInput={setPay}
            placeholder={'You pay'}
            value={pay}
            element={ticker}
            maxValue={totalAmount?.toString()}
          />
          <div className="flex space-x-2 items-center pl-2 font-bold">
            <ExchangeArrows />
            <span>
              1 {symbol} = <span className="text-purple">{unitPrice}</span> {ticker}
            </span>
          </div>
          <NumericalInput
            onUserInput={setRecieve}
            placeholder={'You recieve'}
            value={+recieve === 0 ? '' : recieve}
            readOnly={true}
          />
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => close()}
            color={'bg-transparent'}
            text={'text-gray-300'}
            name={'Back'}
          />

          <ButtonDisabled
            name={`Buy ${symbol}`}
            onClick={() => handleTransaction()}
            disabled={!(+pay > 0 && +pay <= +maxLimit)}
          />
        </div>
      </div>
    </div>
  )
}

export default OfferModal
