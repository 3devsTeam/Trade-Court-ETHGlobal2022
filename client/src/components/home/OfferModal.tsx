import React, { useState, useEffect } from 'react'
import { truncateAddress } from '../../utils/truncateAddress'
import { NumericalInput } from '../create-offer/NumericalInput'
import { useNavigate } from 'react-router'
import { IOffer } from '../../types/interfaces/offer.interface'
import { OfferInput } from '../home/OfferInput'
import { OfferService } from '../../api/offer.services'
import { toast } from 'react-toastify'
import { ButtonDisabled } from '../ui/ButtonDisabled'
import { ethers } from 'ethers'
import { useJoinRoom } from '../../hooks/useJoinRoom'

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
    roomId
  } = offer

  const navigate = useNavigate()

  const [pay, setPay] = useState('0')
  const [recieve, setRecieve] = useState('0')

  // const { roomId } = room;

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

  const info = [
    {
      name: 'Maker:',
      value: truncateAddress(address)
    },
    {
      name: 'Unit Price:',
      value: `${unitPrice} ${ticker}`
    },
    {
      name: 'Available:',
      value: `${quantity} ${symbol}`
    },
    {
      name: 'Limit:',
      value: `${minLimit}-${maxLimit} ${ticker}`
    }
  ]

  return (
    <div className="rounded-[15px] grid grid-cols-2">
      <div className="flex flex-col gap-3 p-3 cursor-default border-2 border-purple rounded-[20px]">
        {info.map((i) => (
          <div className={'flex justify-between'}>
            <p>{i.name}</p>
            <p className={'font-bold'}>{i.value}</p>
          </div>
        ))}
        <div className="break-words bg-purple bg-opacity-20 p-2 rounded-[10px]">
          <p className={'text-sm'}>{offerComment}</p>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] px-3">
        <NumericalInput
          label={'You pay'}
          maxValue={maxLimit}
          onUserInput={setPay}
          placeholder={'You pay'}
          value={pay}
          element={ticker}
        />

        <NumericalInput
          readOnly={true}
          label={'You recieve'}
          onUserInput={setRecieve}
          placeholder={'You recieve'}
          value={recieve}
          element={symbol}
        />

        <div>
          <ButtonDisabled
            onClick={() => handleTransaction()}
            name={`Buy ${symbol}`}
            disabled={!(+pay > 0 && +pay <= +maxLimit)}
          />
        </div>
      </div>
    </div>
  )
}

export default OfferModal
