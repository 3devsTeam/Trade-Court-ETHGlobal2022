import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import contractConfig from '../abis/contractConfig'
import { OfferService } from '../api/offer.services'
import { useToastTx } from './useToastTx'

export const useMakerApprove = (roomId: string, takerNumber: number, id: string, socket: any) => {
  const args = [roomId, takerNumber]

  const { config, status: makerPrepareTxStatus } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'makerApprove',
    args
  })

  const {
    data,
    status: makerContractTxStatus,
    writeAsync: makerApprove
  } = useContractWrite(config as any)

  const makerConfirmed = async () => {
    await makerApprove?.()
  }

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => {
      txSuccess('Maker confirmed')
      await OfferService.makerRecieved(id!)
      socket.emit('makerConfirmed', id)
    },
    onError: (err) => txError(err.message)
  })

  const { txSuccess, txError } = useToastTx(isLoading)

  return {
    data,
    makerConfirmed,
    makerPrepareTxStatus,
    makerContractTxStatus
  }
}
