import React, { SetStateAction, useRef, useState } from "react";
import { useAccount, useEnsName, useNetwork, useSwitchNetwork } from "wagmi";
import { connectors } from "../../wallets/connectors";
import { truncateAddress } from "../../utils/truncateAddress";
import { Modal } from "../ui/Modal";
import { WalletButton } from "./WalletButton";
import { useBalance } from "wagmi";
import { Menu } from "./Menu";
import { NavLink } from "./NavLink";
import useOnClickOutside from "use-onclickoutside";
import { walletsImages } from "../../wallets/walletsImages";

interface Props {
  isConnected: boolean;
  address: string;
  balance: any;
  ensName: any;
  setOpenConnectModal: React.Dispatch<SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<SetStateAction<boolean>>;
  openConnectModal: boolean;
  openMenu: boolean;
}

export const ConnectButton = ({
  address,
  ensName,
  balance,
  isConnected,
  setOpenConnectModal,
  setOpenMenu,
  openMenu,
  openConnectModal,
}: Props) => {
  const [activeWalletImg, setActiveWalletImg] = useState("");

  return isConnected ? (
    <button
      className='rounded-[15px] py-[9px] px-[10px] bg-white shadow-customDark'
      onClick={() => setOpenMenu(!openMenu)}
    >
      <div className='font-bold flex items-center space-x-2 text-black'>
        {/* <div>
          <img src={activeWalletImg} className='w-5 h-5' />
        </div> */}
        <span>
          {balance?.formatted.slice(0, 8)} {balance?.symbol}
        </span>
        <div className='font-medium py-[4px] px-[10px] bg-purple rounded-[10px] text-white'>
          <span>{!ensName ? truncateAddress(address!) : ensName}</span>
        </div>
      </div>
    </button>
  ) : (
    <>
      <button
        className='rounded-[15px] py-1  px-2 relative bg-purple  text-white shadow-customDark'
        onClick={() => setOpenConnectModal(!openConnectModal)}
      >
        <div className='py-1 px-5'>
          <span className='font-bold'>Connect</span>
        </div>
      </button>

      <Modal
        isOpen={openConnectModal}
        close={() => setOpenConnectModal(false)}
        header={"Select wallet"}
        width={"500px"}
      >
        <div className='grid grid-cols-3 gap-5 '>
          {connectors.map((wallet, i) => (
            <WalletButton
              setActiveWalletImg={setActiveWalletImg}
              img={walletsImages[i]}
              onClose={setOpenConnectModal}
              wallet={wallet}
              i={i}
              key={wallet.id}
            >
              <span>{wallet.name}</span>
            </WalletButton>
          ))}
        </div>
      </Modal>
    </>
  );
};
