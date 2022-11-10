import contractConfig from '../abis/contractConfig'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers, BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { useTypedSelector } from './useTypedSelector'
import { OfferService } from '../api/offer.services'
import { IPayment } from '../types/interfaces/payment.interface'
import { useNavigate } from 'react-router-dom'
import { useActions } from './useActions'
import { toast } from 'react-toastify'
import { sha256 } from 'js-sha256'

// createRoom ДЛЯ ДОМИНАТОРОВ
// _roomNumber (uint256)
// _timeForTakerAndMaker (uint32)
// _maxLimit (uint256)
// _lowLimit (uint256)
// _addressOfToken (address) ДЛЯ ЩИТКОИНОВ
// _msgValue (uint256) ДЛЯ ЩИТКОИНОВ
// _rate (uint32) UNIT PRICE

export const useCreateRoom = () => {
  const { address } = useAccount()

  const {
    quantity,
    unitPrice,
    timeLimit,
    minLimit,
    maxLimit,
    crypto,
    fiat,
    offerComment,
    payMethods
  } = useTypedSelector((state) => state.createOfferReducer)

  const navigate = useNavigate()

  const { resetOffer } = useActions()

  const roomId = BigNumber.from('0x' + sha256(Date.now().toString() + address))

  const handleCreateOffer = async () => {
    OfferService.create({
      offerType: 'buy',
      payMethods: payMethods.map((payment: IPayment) => {
        const { bank, cardNumber, region, paymentDescription } = payment

        return {
          bank,
          cardNumber,
          region,
          paymentDescription
        }
      }),
      fiat: fiat._id,
      roomId,
      unitPrice,
      amount: unitPrice * quantity,
      quantity,
      minLimit,
      maxLimit,
      crypto: crypto._id,
      offerComment
    })
      .then(() => {
        toast.success('Offer is created', {
          position: toast.POSITION.BOTTOM_RIGHT
        })

        navigate('/')
        resetOffer()
      })
      .catch((error) =>
        toast.error(error, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      )
  }

  const { config, error: prepareError } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'createRoom',
    args: [
      ethers.utils.parseEther(quantity.toString()),
      quantity,
      roomId,
      +timeLimit * 60,
      maxLimit,
      minLimit,
      unitPrice
    ],
    overrides: {
      // gasLimit: 400000
    }
  })

  const { data, isError, writeAsync: createOffer } = useContractWrite(config)

  const {
    isSuccess,
    isLoading,
    data: hash
  } = useWaitForTransaction({
    hash: data?.hash
  })

  return {
    data,
    handleCreateOffer,
    isSuccess,
    createOffer,
    isError,
    isLoading,
    hash,
    prepareError
  }
}
