import React, { useState } from 'react'
import { Chain, useNetwork, useSwitchNetwork } from 'wagmi'
import { Modal } from '../ui/Modal'
import { NetworkButton } from './NetworkButton'

export const SwitchNetwork = () => {
  const { chain, chains } = useNetwork()

  const [openSwitchNetwork, setOpenSwitchNetwork] = useState(false)

  return (
    <button
      onClick={() => setOpenSwitchNetwork(!openSwitchNetwork)}
      className="rounded-[15px] relative bg-white shadow-customDark h-full px-[10px] buttonFocus"
    >
      <span className="font-bold">{chain?.name}</span>

      {openSwitchNetwork ? (
        <Modal header="Switch Network" close={setOpenSwitchNetwork}>
          <div className="flex flex-col gap-y-5">
            {chains.map((chain, i) => (
              <NetworkButton chain={chain} key={i} />
            ))}
          </div>
        </Modal>
      ) : null}
    </button>
  )
}
