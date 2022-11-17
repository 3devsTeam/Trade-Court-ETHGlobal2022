import contractConfig from '../abis/contractConfig'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers, BigNumber } from 'ethers'
import { useTypedSelector } from './useTypedSelector'
import { OfferService } from '../api/offer.services'
import { useNavigate } from 'react-router-dom'
import { useActions } from './useActions'
import { toast } from 'react-toastify'
import { useGenerateRoom } from './useGenerateRoom'
import { useEffect, useRef } from 'react'

export const useCreateRoom = () => {
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

  const toastId = useRef(null)

  const navigate = useNavigate()

  const { resetOffer } = useActions()

  const { roomId } = useGenerateRoom()

  const limitPrice = (value: string, unitPrice: number) => {
    if (value != '.' && value != '0' && value != '' && value != undefined) {
      return ethers.utils.parseEther(value.toString()).div(BigNumber.from(unitPrice))
    } else {
      return '1'
    }
  }

  const args = [
    roomId,
    +timeLimit * 60,
    limitPrice(maxLimit.toString(), +unitPrice),
    limitPrice(minLimit.toString(), +unitPrice),
    '0x0000000000000000000000000000000000000000',
    ethers.utils.parseEther('0'),
    +unitPrice
  ]
  console.log(args)

  const { config, status: prepareTxStatus } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'createRoom',
    args,
    overrides: {
      value: ethers.utils.parseEther(+quantity > 0 ? quantity.toString() : '0'),
      gasLimit: BigNumber.from(400000)
    }
  })

  const { data, status: txStatus, writeAsync } = useContractWrite(config as any)

  const txConfirmed = () => {
    toast.update(toastId.current, {
      render: 'Tx is confirmed',
      position: toast.POSITION.BOTTOM_RIGHT,
      type: 'success',
      isLoading: false
    })
  }

  const offerCreated = () => {
    toast.update(toastId.current, {
      render: 'Offer is Created!',
      type: 'success',
      position: toast.POSITION.BOTTOM_RIGHT,
      isLoading: false,
      closeOnClick: true,
      autoClose: 5000
    })
    navigate('/')
    resetOffer()
  }

  const txError = (error: string) => {
    toast.update(toastId.current, {
      render: error,
      type: 'error',
      position: toast.POSITION.BOTTOM_RIGHT,
      isLoading: false,
      closeOnClick: true,
      autoClose: 5000
    })
  }

  const {
    isSuccess,
    isLoading,
    data: hash
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      txConfirmed()
      OfferService.create({
        offerType: 'buy',
        payMethods: payMethods,
        fiat: fiat._id,
        roomId: roomId!.toString(),
        unitPrice,
        amount: +unitPrice * +quantity,
        quantity,
        minLimit,
        maxLimit,
        crypto: crypto._id,
        offerComment
      })
        .then(() => offerCreated())
        .catch((error) => txError(error))
    }
  })

  useEffect(() => {
    const loading = () => {
      toastId.current = toast(`Waiting for tx...`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        isLoading: true
      })
    }

    if (isLoading) {
      loading()
    }
  }, [isLoading])

  const handleCreateOffer = async () => {
    writeAsync?.()
  }

  return {
    data,
    handleCreateOffer,
    isSuccess,
    isLoading,
    hash,
    prepareTxStatus,
    txStatus
  }
}
