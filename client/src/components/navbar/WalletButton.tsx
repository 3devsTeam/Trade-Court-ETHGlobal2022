import React, { SetStateAction } from "react";
import { connect } from "@wagmi/core";
import { connectors } from "../../connectors";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

interface Props {
  setActiveWalletImg: any;
  img: string;
  onClose: any;
  wallet: MetaMaskConnector | WalletConnectConnector | CoinbaseWalletConnector;
  i: number;
  children: React.ReactNode;
}

export const WalletButton = ({
  setActiveWalletImg,
  wallet,
  i,
  onClose,
  img,
}: Props) => {
  return (
    <button
      onClick={() => {
        connect({ connector: connectors[i] }).then(() => {
          onClose(false);
          setActiveWalletImg(img);
        });
      }}
      className='flex flex-col justify-center shadow rounded-lg p-3'
    >
      <div className='flex justify-center'>
        <img src={img} alt='' className='w-7 h-7 rounded-lg' />
      </div>

      <div>
        <span className='text-[16px] font-bold'>
          {wallet.name === "Coinbase Wallet" ? "Coinbase" : wallet.name}
        </span>
      </div>
    </button>
  );
};
