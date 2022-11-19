import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import contractConfig from '../abis/contractConfig'
import { OfferService } from '../api/offer.services'
import { useToastTx } from './useToastTx'

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

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => {
      txSuccess('Taker confirmed')
      await OfferService.takerSend(id!)
      await socket.emit('takerConfirmed', id)
    },
    onError: (err) => txError(err.name)
  })

  const { txSuccess, txError } = useToastTx(isLoading)

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
