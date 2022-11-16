import { useContractWrite, usePrepareContractWrite } from 'wagmi'
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

  const takerTransfered = async () => {
    await takerApprove?.()
    await OfferService.takerSend(id!)
    socket.emit('takerConfirmed', id)
  }

  return {
    data,
    takerTransfered,
    prepareTxStatus,
    contractTxStatus
  }
}
