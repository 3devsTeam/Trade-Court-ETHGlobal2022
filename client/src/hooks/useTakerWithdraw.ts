import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import contractConfig from '../abis/contractConfig'

export const useTakerWithdraw = (roomId: string, takerNumber: number) => {
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

  return {
    takerWithdrawTxData,
    takerWithdrawPrepareTxStatus,
    takerWithdrawTxStatus,
    takerWithdraw
  }
}
