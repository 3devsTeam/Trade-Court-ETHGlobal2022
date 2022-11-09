import React from 'react'
import { Chain } from 'wagmi'
import { SelectButton } from './SelectButton'

interface Props {
  chain: Chain
  switchNetwork: ((chainId_?: number | undefined) => Promise<Chain>) | undefined
}

export const NetworkButton: React.FC<Props> = ({ chain, switchNetwork }) => {
  return (
    <SelectButton onClick={() => switchNetwork(chain.id)}>
      <span className="text-lg font-bold">{chain.name}</span>
    </SelectButton>
  )
}
