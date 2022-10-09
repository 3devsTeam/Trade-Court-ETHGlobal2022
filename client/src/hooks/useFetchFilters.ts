import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "wagmi"
import { FiatServices } from "../api/fiat.services"
import { CryptoServices } from "../api/crypto.services"

export const useFetchFilters = () => {

    const { chain } = useNetwork()

    const { data: banks, isSuccess: banksSuccess, isError: banksError, isLoading: banksLoading } = useQuery(['get banks'], () =>  FiatServices.getBanks(), {
        select: (data) => data.data.allBanks
    })

    const { data: crypto, isSuccess: cryptoSuccess, isError: cryptoError, isLoading: cryptoLoading} = useQuery(['get crypto by chain'], () => CryptoServices.getByChain(chain!.name), {
        select: data => data.tokens
    })

    return {

        isFetchFiltersOk: banksSuccess,
        banks: {
            data: banks,
            isSuccess: banksSuccess,
            isError: banksError,
            isLoading: banksLoading
        },
        crypto: {
            data: crypto,
            isSuccess: cryptoSuccess,
            isError: cryptoError,
            isLoading: cryptoLoading
        }
    }

}