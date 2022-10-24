import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useQuery } from "wagmi";
import { TokenService } from "../api/tokens.services";
import { useAccount, useNetwork } from "wagmi";
import { IToken } from "../models/models";
import { useActions } from "../hooks/useActions";

export const useTokens = () => {
  const { setCrypto } = useActions();

  const { chain } = useNetwork();

  const chainName = chain?.name.toLowerCase();

  const { address } = useAccount();

  const [newTokens, setNewTokens] = useState([]);

  const { data: tokens, isSuccess: successGetTokens } = useQuery(
    [`get ${chainName} tokens`],
    () => TokenService.getTokens(address!, chainName!),
    {
      select: (data) => data.data.data,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      onSuccess: (data) => {
        setCrypto(data[0]);
        setNewTokens(tokens);
      },
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

  try {
    newTokens?.map((el: IToken, i: number) => {
      const weiBalance = BigNumber.from(el.balance);
      //console.log(weiBalance);
      if (!weiBalance.eq(zero)) {
        //const temp = Object.assign({}, el);
        //console.log(temp);
        //console.info("wei balance", weiBalance.toString());
        const weiExchangeRate = BigNumber.from(exchangeRate[`${el.address}`]);
        //console.log(weiExchangeRate.toString());
        //console.log(ethUsdRate);
        const usdRate = BigNumber.from(parseInt(ethUsdRate) * 100);
        //console.log("usd rate", usdRate);
        const weiPrice = weiBalance
          .mul(weiExchangeRate)
          .mul(usdRate)
          .div(div36);
        const usdAmount = parseInt(weiPrice.toString()) / 100;
        console.log(usdAmount);
        const ethAmount = parseInt(weiBalance.div(div15).toString()) / 1000;
        console.log(ethAmount);
        //console.log(el);

        // el.tokenAmount = ethAmount;
        el.balance = usdAmount;
        // temp.tokenAmount = ethAmount;
        // temp.balance = usdAmount;
        // return {
        //   ...el,
        //   tokenAmount: ethAmount,
        //   balance: usdAmount,
        // };
      }
    });
  } catch (err) {
    console.log(err);
  }

  return { newTokens, isSuccess };
};
