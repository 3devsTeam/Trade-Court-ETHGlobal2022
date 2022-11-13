import contractConfig from '../abis/contractConfig'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

interface Args {
  args: any
}
// createRoom ДЛЯ ДОМИНАТОРОВ
// _roomNumber (uint256)
// _timeForTakerAndMaker (uint32)
// _maxLimit (uint256)
// _lowLimit (uint256)
// _addressOfToken (address) ДЛЯ ЩИТКОИНОВ
// _msgValue (uint256) ДЛЯ ЩИТКОИНОВ
// _rate (uint32) UNIT PRICE

export const useCreateRoom = (value: number, args: any) => {
  console.log(args)

  const { config, error } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'createRoom',
    args,
    overrides: {
      value
      //   gasLimit: 400000
    }
  })

  const { data, isError, writeAsync: createOffer } = useContractWrite(config)

  const {
    isSuccess,
    isLoading,
    data: hash
  } = useWaitForTransaction({
    hash: data?.hash
  })

  return {
    data,
    isSuccess,
    createOffer,
    isError,
    isLoading,
    hash,
    error
  }
}
