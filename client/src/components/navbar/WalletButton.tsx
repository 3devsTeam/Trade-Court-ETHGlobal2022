import React, { SetStateAction } from "react";
import { connect } from "@wagmi/core";
import { connectors } from "../../wallets/connectors";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { useSignMessage } from "wagmi";

interface Props {
  sign: () => void;
  img: string;
  close: React.Dispatch<SetStateAction<boolean>>;
  wallet: MetaMaskConnector | WalletConnectConnector | CoinbaseWalletConnector;
  i: number;
  children: React.ReactNode;
}

export const WalletButton = ({ sign, wallet, i, close, img }: Props) => {
  return (
    <button
      onClick={() => {
        connect({ connector: connectors[i] }).then(() => {
          close(false);
          sign();
        });
      }}
      className='flex items-center flex-col shadow rounded-lg p-3'
    >
      <img src={img} alt='' className='w-8 h-8' />
      <span className='text-[16px] font-bold'>
        {wallet.name === "Coinbase Wallet" ? "Coinbase" : wallet.name}
      </span>
    </button>
  );
};
