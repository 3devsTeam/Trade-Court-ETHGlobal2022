import { UseContractConfig } from 'wagmi/dist/declarations/src/hooks/contracts/useContract'
import config from './to_fiat_abi.json'

const contractConfig: UseContractConfig = {
  addressOrName: config.address,
  contractInterface: config.abi
}

export default contractConfig
