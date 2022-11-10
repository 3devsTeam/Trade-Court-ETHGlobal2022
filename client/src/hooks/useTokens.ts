import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import { TokenService } from '../api/tokens.services'
import { useAccount, useNetwork } from 'wagmi'
import { useActions } from '../hooks/useActions'
import { useQueries, useQuery } from '@tanstack/react-query'
import { Preview } from '../components/create-offer/Preview'
import { ICrypto } from '../types/interfaces/crypto.interface'

export const useTokens = () => {
  const { chain } = useNetwork()

  const chainId = chain?.id.toString()
  const chainName = chain?.name.toLowerCase()

  const { address } = useAccount()

  const { data: tokens, status: statusTokens } = useQuery(
    [`get ${chainId} chain tokens`],
    () => TokenService.getTokens(address!, chainId!),
    {
      select: (data) => data.data.data,
      refetchOnWindowFocus: false,
      refetchOnMount: true
    }
  )

  const { data: exchangeRate, status: statusExchangeRate } = useQuery(
    [`get exchange ${chainId} token rate`],
    () => TokenService.getExchangeRate(chainId!),
    {
      select: (data) => data.data.data,
      refetchInterval: 60000
    }
  )

  const { data: ethUsdRate, status: statusEthUsdRate } = useQuery(
    [`get ${chainName} usd rate`],
    () => TokenService.getEthUsdRate(chainName!),
    {
      select: (data) =>
        chainName === 'polygon' ? data.data['matic-network'].usd : data.data.ethereum.usd,
      refetchInterval: 60000
    }
  )

  const isSuccess =
    statusEthUsdRate === 'success' && statusExchangeRate === 'success' && statusTokens === 'success'
  const isLoading =
    statusEthUsdRate === 'loading' && statusExchangeRate === 'loading' && statusTokens === 'loading'
  const isError =
    statusEthUsdRate === 'error' && statusExchangeRate === 'error' && statusTokens === 'error'

  const zero = BigNumber.from(0)
  const div36 = BigNumber.from(10).pow(36)
  const div15 = BigNumber.from(10).pow(15)

  const newTokens = tokens?.map((crypto: ICrypto) => {
    const weiBalance = BigNumber.from(crypto.balance)

    if (!weiBalance.eq(zero)) {
      const weiExchangeRate = BigNumber.from(exchangeRate[`${crypto.address}`])

      const usdRate = BigNumber.from(parseInt(ethUsdRate) * 100)

      const weiPrice = weiBalance.mul(weiExchangeRate).mul(usdRate).div(div36)
      const usdAmount = parseInt(weiPrice.toString()) / 100
      const ethAmount = parseInt(weiBalance.div(div15).toString()) / 1000

      return {
        ...crypto,
        tokenAmount: ethAmount,
        balance: usdAmount
      }
    }
    return crypto
  })

  return { tokens: newTokens, isSuccess, isLoading, isError }
}
