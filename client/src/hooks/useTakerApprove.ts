import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import contractConfig from '../abis/contractConfig'

export const useTakerApprove = (roomId: string, takerNumber: number) => {
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

  return {
    data,
    prepareTxStatus,
    contractTxStatus,
    takerApprove
  }
}
