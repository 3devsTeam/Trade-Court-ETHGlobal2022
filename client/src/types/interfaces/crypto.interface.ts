import { BigNumber } from 'ethers'

export interface ICrypto {
  tokenAmount: number
  address: string
  balance: number | BigNumber | string
  chainId: number
  decimals: number
  logoUrl: string
  name: string
  symbol: string
  _id: string
}
