import { useQuery } from '@tanstack/react-query'
import { useNetwork } from 'wagmi'
import { FiatServices } from '../api/fiat.services'
import { CryptoServices } from '../api/crypto.services'

export const useFetchFilters = () => {
  const { chain } = useNetwork()

  const chainId = chain?.id.toString()

  const {
    data: fiat,
    status: fiatStatus,
    error: fiatError
  } = useQuery(['get fiat'], () => FiatServices.getFiat(), {
    select: (data) => data.data.allFiat
  })

  const {
    data: crypto,
    status: cryptoStatus,
    error: cryptoError
  } = useQuery(['get crypto by chain'], () => CryptoServices.getByChain(chainId!), {
    select: (data) => data.tokens
  })

  return {
    isFiltersFetchOk: fiatStatus === 'success' && cryptoStatus === 'success',
    fiat: {
      data: fiat,
      status: fiatStatus,
      error: fiatError
    },
    crypto: {
      data: crypto,
      status: cryptoStatus,
      error: cryptoError
    }
  }
}
