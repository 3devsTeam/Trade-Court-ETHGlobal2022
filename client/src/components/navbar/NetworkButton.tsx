import React from 'react'
import { SelectButton } from './SelectButton'
import { Chain, useSwitchNetwork } from 'wagmi'
import { useNetwork } from 'wagmi'

interface Props {
  chain: Chain & {
    unsupported?: boolean | undefined
  }
}

export const NetworkButton: React.FC<Props> = ({ chain }) => {
  const { switchNetworkAsync } = useSwitchNetwork()

  return (
    <SelectButton onClick={() => switchNetworkAsync?.(chain?.id)}>
      <span className="text-lg font-bold">{chain?.name}</span>
    </SelectButton>
  )
}
