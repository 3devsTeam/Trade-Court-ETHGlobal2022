import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import contractConfig from '../abis/contractConfig'
import { OfferService } from '../api/offer.services'

export const useTakerWithdraw = (roomId: string, takerNumber: number, id: string, socket: any) => {
  const args = [roomId, takerNumber]

  const { config, status: takerWithdrawPrepareTxStatus } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'takerWithdraw',
    args
  })

  const {
    data: takerWithdrawTxData,
    status: takerWithdrawTxStatus,
    writeAsync: takerWithdraw
  } = useContractWrite(config as any)

  const takerClaim = async () => {
    await takerWithdraw?.()
    await OfferService.claimByID(id!)
  }

  return {
    takerWithdrawTxData,
    takerWithdrawPrepareTxStatus,
    takerWithdrawTxStatus,
    takerClaim
  }
}
