import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import contractConfig from '../abis/contractConfig'

export const useMakerApprove = (roomId: string, takerNumber: number) => {
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

  return {
    data,
    makerApprove,
    makerPrepareTxStatus,
    makerContractTxStatus
  }
}
