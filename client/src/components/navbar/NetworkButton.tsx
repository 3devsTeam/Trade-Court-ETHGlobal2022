import React from 'react'
import { SelectButton } from './SelectButton'
import { useSwitchNetwork } from 'wagmi'
import { useNetwork } from 'wagmi'

export const NetworkButton: React.FC = () => {
  const { switchNetworkAsync } = useSwitchNetwork()
  const { chain } = useNetwork()

  return (
    <SelectButton onClick={() => switchNetworkAsync?.(chain?.id)}>
      <span className="text-lg font-bold">{chain?.name}</span>
    </SelectButton>
  )
}
