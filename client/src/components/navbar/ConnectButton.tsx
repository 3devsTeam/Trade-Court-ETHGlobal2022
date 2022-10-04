import { useRef, useState } from "react";
import { useAccount, useEnsName, useNetwork, useSwitchNetwork } from "wagmi";
import { connectors } from "../../connectors";
import { truncateAddress } from "../../utils/truncateAddress";
import { Modal } from "../modal/Modal";
import { WalletButton } from "./WalletButton";
import { useBalance } from "wagmi";
import { Menu } from "./Menu";
import { NavLink } from "./NavLink";
import useOnClickOutside from "use-onclickoutside";
import { walletsImages } from "../../walletsImages";

export const ConnectButton = () => {
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { isConnected, address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  const { data: ensName, isSuccess } = useEnsName({
    address,
  });

  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => setOpenMenu(false));

  return isConnected ? (
    <button
      className='rounded-[15px] py-1  px-2 relative bg-white shadow-customDark'
      onClick={() => setOpenMenu(!openMenu)}
    >
      <div className='font-bold flex items-center space-x-2 text-black'>
        <span>
          {data?.formatted.slice(0, 8)} {data?.symbol}
        </span>
        <div className='font-medium py-1 px-2 bg-purple rounded-[10px] text-white'>
          <span>{!ensName ? truncateAddress(address!) : ensName}</span>
        </div>
      </div>

      {openMenu && <Menu menuRef={menuRef} onClose={setOpenConnectModal} />}
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
