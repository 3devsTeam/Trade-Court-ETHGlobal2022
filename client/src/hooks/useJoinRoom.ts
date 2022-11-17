import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import contractConfig from '../abis/contractConfig'
import { ethers, BigNumber } from 'ethers'
import { OfferService } from '../api/offer.services'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const useJoinRoom = (roomId: string, recieve: string, pay: string, _id: string) => {
  const navigate = useNavigate()

  const args = [
    roomId,
    pay != '.' && pay != '' ? ethers.utils.parseEther(Number(recieve).toFixed(6).toString()) : '0'
  ]

  const handleTransaction = () => {
    joinRoom?.()
  }

  const { config, status: prepareTxStatus } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'joinRoom',
    args,
    overrides: {
      gasLimit: BigNumber.from(400000)
    }
  })

  const { data, status: txStatus, writeAsync: joinRoom } = useContractWrite(config as any)

  const { isSuccess, isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      OfferService.joinByID(_id, {
        amount: pay
      })
        .then(({ data }) => {
          navigate(`/transaction/${data?.newRoom._id}`)
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
    }
  })

  return { data, prepareTxStatus, txStatus, handleTransaction, isLoading, isSuccess }
}
