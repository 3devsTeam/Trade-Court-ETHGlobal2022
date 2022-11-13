import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import contractConfig from '../abis/contractConfig'

export const useTakerApprove = () => {
  const args = ['']

  const { config, status: prepareTxStatus } = usePrepareContractWrite({
    ...contractConfig,
    functionName: '',
    args
  })

  const { data, status: contractTxStatus, writeAsync: takerApprove } = useContractWrite(config)

  return {
    data,
    prepareTxStatus,
    contractTxStatus,
    takerApprove
  }
}
