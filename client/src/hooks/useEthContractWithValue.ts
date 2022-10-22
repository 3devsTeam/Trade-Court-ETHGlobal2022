import { ethers } from "ethers";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ethContractConfig from "../abis/ethContractConfig";

export const useEthContractWithValue = (
  args: any,
  value: ethers.BigNumber,
  functionName: string
) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    ...ethContractConfig,
    functionName: functionName,
    args: args,
    overrides: {
      value: value,
      gasLimit: 400000,
    },
  });

  const { data, error, isError, writeAsync } = useContractWrite(config);

  const {
    isSuccess,
    isLoading,
    data: hash,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    data,
    isSuccess,
    writeAsync,
    isError,
    isLoading,
    hash,
    prepareError,
  };

  // } catch(err) {
  //   console.log(err)
  // }
};
