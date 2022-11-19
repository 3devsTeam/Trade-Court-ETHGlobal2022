import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import contractConfig from '../abis/contractConfig'
import { OfferService } from '../api/offer.services'

export const useTakerWithdraw = (roomId: string, takerNumber: number, id: string, socket: any) => {
  const args = [roomId, takerNumber]

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
    }
  })

  const takerClaim = async () => {
    await takerWithdraw?.()
  }

  return {
    takerClaim
  }
}
