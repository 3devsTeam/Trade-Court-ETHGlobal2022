import React, { useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { Modal } from "../ui/Modal";

export const SwitchNetwork = () => {
  const { chain, chains } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const [openSwitchNetwork, setOpenSwitchNetwork] = useState(false);

  return (
    <button
      onClick={() => setOpenSwitchNetwork(!openSwitchNetwork)}
      className='rounded-[15px] py-2 px-2 relative bg-white shadow-customDark'
    >
      <span className='font-bold'>{chain?.name}</span>

      <Modal
        header='Switch Network'
        isOpen={openSwitchNetwork}
        close={setOpenSwitchNetwork}
      >
        <div className='flex flex-col'>
          {chains.map((chain, i) => (
            <button
              key={i}
              onClick={async () => await switchNetworkAsync(chain.id)}
            >
              <span className='font-bold'>{chain.name}</span>
            </button>
          ))}
        </div>
      </Modal>
    </button>
  );
};
