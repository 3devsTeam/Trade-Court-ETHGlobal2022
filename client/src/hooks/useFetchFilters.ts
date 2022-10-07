import { useQuery } from "@tanstack/react-query"
import { API } from "../api/api"

export const useFetchFilters = () => {
    const { data: banks, isSuccess: banksSuccess, isError: banksError, isLoading: banksLoading } = useQuery(['get banks'], () =>  API.getBanks(), {
        select: (data) => data.data.data.allBanks
    })

    return {

        isFetchFiltersOk: banksSuccess,
        banks: {
            data: banks,
            isSuccess: banksSuccess,
            isError: banksError,
            isLoading: banksLoading
        }
    }

}