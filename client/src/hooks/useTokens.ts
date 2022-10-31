import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { TokenService } from "../api/tokens.services";
import { useAccount, useNetwork } from "wagmi";
import { IToken } from "../models/models";
import { useActions } from "../hooks/useActions";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Preview } from "../components/create-offer/Preview";

export const useTokens = () => {
  const { chain } = useNetwork();

  const chainName = chain?.name.toLowerCase();

  const { setCrypto } = useActions();

  const { address } = useAccount();

  const { data: tokens, isSuccess: successGetTokens } = useQuery(
    [`get ${chainName} tokens`],
    () => TokenService.getTokens(address!, chainName!),
    {
      select: (data) => data.data.data,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );

  const { data: exchangeRate, isSuccess: successGetExchangeTokens } = useQuery(
    [`get exchange ${chainName} token rate`],
    () => TokenService.getExchangeRate(chainName!),
    {
      select: (data) => data.data.data,
      refetchInterval: 60000,
    }
  );

  const { data: ethUsdRate, isSuccess: successGetEthUsdRate } = useQuery(
    [`get ${chainName} usd rate`],
    () => TokenService.getEthUsdRate(chainName!),
    {
      select: (data) =>
        chainName === "polygon"
          ? data.data["matic-network"].usd
          : data.data.ethereum.usd,
      refetchInterval: 60000,
    }
  );

  const isSuccess =
    successGetTokens && successGetExchangeTokens && successGetEthUsdRate;

  const zero = BigNumber.from(0);
  const div36 = BigNumber.from(10).pow(36);
  const div15 = BigNumber.from(10).pow(15);

  const newTokens = tokens?.map((el: IToken, i: number) => {
    const weiBalance = BigNumber.from(el.balance);

    if (!weiBalance.eq(zero)) {
      const weiExchangeRate = BigNumber.from(exchangeRate[`${el.address}`]);

      const usdRate = BigNumber.from(parseInt(ethUsdRate) * 100);

      const weiPrice = weiBalance.mul(weiExchangeRate).mul(usdRate).div(div36);
      const usdAmount = parseInt(weiPrice.toString()) / 100;
      const ethAmount = parseInt(weiBalance.div(div15).toString()) / 1000;

      return {
        ...el,
        tokenAmount: ethAmount,
        balance: usdAmount,
      };
    }
    return el;
  });

  return { tokens: newTokens, isSuccess };
};
