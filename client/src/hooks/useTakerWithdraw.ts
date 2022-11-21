import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import contractConfig from '../abis/contractConfig'
import { OfferService } from '../api/offer.services'
import { useActions } from './useActions'

export const useTakerWithdraw = (roomId: string, takerNumber: number, id: string, socket: any) => {
  const args = [roomId, takerNumber]

  const { resetTxDeal } = useActions()

  const { config, status: takerWithdrawPrepareTxStatus } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'takerWithdraw',
    args
  })

  const { data, writeAsync: takerWithdraw } = useContractWrite(config as any)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => {
      await OfferService.claimByID(id!)
      resetTxDeal()
    }
  })

  const takerClaim = async () => {
    await takerWithdraw?.()
  }

  return {
    takerClaim
  }
}
