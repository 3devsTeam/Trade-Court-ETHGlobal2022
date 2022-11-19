import contractConfig from '../abis/contractConfig'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers, BigNumber } from 'ethers'
import { useTypedSelector } from './useTypedSelector'
import { OfferService } from '../api/offer.services'
import { useNavigate } from 'react-router-dom'
import { useActions } from './useActions'
import { useGenerateRoom } from './useGenerateRoom'
import { useToastTx } from './useToastTx'

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

  const {
    isLoading,
    isError,
    data: hash
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      txSuccess('Tx is confirmed')
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
        .then(() => {
          txSuccess('Offer is Created')
          navigate('/')
          resetOffer()
        })
        .catch((error) => txError(error))
    },
    onError: (err) => txError(err.message)
  })

  const { txSuccess, txError } = useToastTx(isLoading)

  const handleCreateOffer = async () => {
    await writeAsync?.()
  }

  return {
    data,
    handleCreateOffer,
    isLoading,
    hash,
    prepareTxStatus,
    txStatus
  }
}
