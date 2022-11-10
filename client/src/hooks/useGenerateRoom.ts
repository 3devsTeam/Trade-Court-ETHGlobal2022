import { BigNumber } from 'ethers'
import { sha256 } from 'js-sha256'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export const useGenerateRoom = () => {
  const { address } = useAccount()

  const [roomId, setRoomId] = useState<BigNumber>()

  useEffect(() => {
    setRoomId(BigNumber.from('0x' + sha256(Date.now().toString() + address).slice(0, 40)))
  }, [])

  return { roomId }
}
