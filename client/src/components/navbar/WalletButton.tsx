import React, { SetStateAction, useState } from 'react'
import { connect } from '@wagmi/core'
import { connectors } from '../../wallets/connectors'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { useAccount, useConnect, useSignMessage } from 'wagmi'
import { SelectButton } from './SelectButton'

interface Props {
  sign: () => Promise<any>
  img: string
  close: React.Dispatch<SetStateAction<boolean>>
  wallet: MetaMaskConnector | WalletConnectConnector | CoinbaseWalletConnector
  i: number
}

export const WalletButton = ({ sign, wallet, i, close, img }: Props) => {
  const connectWallet = () => {
    try {
      connect({ connector: connectors[i] }).then(() => sign())
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SelectButton onClick={connectWallet}>
      <div className="flex items-center space-x-2">
        <img
          src={img}
          alt=""
          className={`w-8 h-8 ${wallet.name === 'Coinbase Wallet' ? 'rounded-full' : ''}`}
        />
        <span className="text-lg font-bold">
          {wallet.name === 'Coinbase Wallet' ? 'Coinbase' : wallet.name}
        </span>

        {/* {isConnecting && ? <span>Connecting...</span> : null} */}
      </div>
    </SelectButton>
  )
}
