import React, { useState } from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { Modal } from '../ui/Modal'
import { NetworkButton } from './NetworkButton'

export const SwitchNetwork = () => {
  const { chain, chains } = useNetwork()
  const { switchNetworkAsync } = useSwitchNetwork()

  const [openSwitchNetwork, setOpenSwitchNetwork] = useState(false)

  return (
    <button
      onClick={() => setOpenSwitchNetwork(!openSwitchNetwork)}
      className="rounded-[15px] relative bg-white shadow-customDark h-full px-[10px]">
      <span className="font-bold">{chain?.name}</span>

      {openSwitchNetwork ? (
        <Modal header="Switch Network" close={setOpenSwitchNetwork}>
          <div className="flex flex-col">
            {chains.map((chain, i) => (
              <NetworkButton chain={chain} switch={switchNetworkAsync} key={i} />
            ))}
          </div>
        </Modal>
      ) : null}
    </button>
  )
}
