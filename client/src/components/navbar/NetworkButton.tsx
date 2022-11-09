import React from 'react'
import { Chain } from 'wagmi'
import { SelectButton } from './SelectButton'

interface Props {
  chain: Chain
  switch: (chainId_?: number | undefined) => Promise<Chain> | undefined
}

export const NetworkButton: React.FC<Props> = ({ chain }) => {
  return (
    // <SelectButton onClick={() => switch(chain.id)}>
    //     <span>{chain.name}</span>
    // </SelectButton>
    <SelectButton onClick={() => {}}>
      <span>{chain.name}</span>
    </SelectButton>
  )
}
