import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import contractConfig from '../abis/contractConfig'
import { OfferService } from '../api/offer.services'

export const useTakerApprove = (roomId: string, takerNumber: number, id: string, socket: any) => {
  const args = [roomId, takerNumber]

  const { config, status: prepareTxStatus } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'takerApprove',
    args
  })

  const {
    data,
    status: contractTxStatus,
    writeAsync: takerApprove
  } = useContractWrite(config as any)

  const { isError, isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => {
      await OfferService.takerSend(id!)
      await socket.emit('takerConfirmed', id)
    }
  })

  const takerTransfered = async () => {
    await takerApprove?.()
  }

  return {
    data,
    takerTransfered,
    prepareTxStatus,
    contractTxStatus
  }
}
