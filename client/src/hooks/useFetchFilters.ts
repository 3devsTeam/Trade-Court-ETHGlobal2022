import { useQuery } from "@tanstack/react-query";
import { useNetwork } from "wagmi";
import { FiatServices } from "../api/fiat.services";
import { CryptoServices } from "../api/crypto.services";

export const useFetchFilters = () => {
  const { chain } = useNetwork();

  const {
    data: fiat,
    isSuccess: fiatSuccess,
    isError: fiatError,
    isLoading: fiatLoading,
  } = useQuery(["get fiat"], () => FiatServices.getFiat(), {
    select: (data) => data.data.allFiat,
  });

  const {
    data: crypto,
    isSuccess: cryptoSuccess,
    isError: cryptoError,
    isLoading: cryptoLoading,
  } = useQuery(
    ["get crypto by chain"],
    () => CryptoServices.getByChain(chain!.name),
    {
      select: (data) => data.tokens,
    }
  );

  return {
    isFetchFiltersOk: fiatSuccess,
    fiat: {
      data: fiat,
      isSuccess: fiatSuccess,
      isError: fiatError,
      isLoading: fiatLoading,
    },
    crypto: {
      data: crypto,
      isSuccess: cryptoSuccess,
      isError: cryptoError,
      isLoading: cryptoLoading,
    },
  };
};
