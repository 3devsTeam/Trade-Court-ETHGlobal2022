import { useRef, useState } from 'react'
import { Logo } from './Logo'
import { useNavigate } from 'react-router-dom'
import { useAccount, useBalance, useEnsName, useSignMessage } from 'wagmi'
import { ConnectButton } from './ConnectButton'
import { SwitchNetwork } from './SwitchNetwork'
import { Menu } from './Menu'
import useOnClickOutside from 'use-onclickoutside'

export const Navbar = () => {
  const { isConnected, address } = useAccount()
  const {
    data: balance,
    isError,
    isLoading
  } = useBalance({
    address
  })
  const { data: ensName, isSuccess } = useEnsName({
    address
  })

  const [openConnectModal, setOpenConnectModal] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const ref = useRef(null)

  const handleCloseMenu = () => {
    setOpenMenu(false)
  }

  useOnClickOutside(ref, handleCloseMenu)

  return (
    <nav className={'p-5 flex justify-between items-center w-full'}>
      <div>
        <Logo />
        <h1 className="text-purple text-sm">Beta Version. Use at your own risk.</h1>
      </div>

      <div className="flex space-x-2 items-center relative h-[2.5rem]">
        {isConnected && <SwitchNetwork />}
        <div ref={ref} className="h-full">
          <ConnectButton
            address={address!}
            ensName={ensName}
            balance={balance}
            isConnected={isConnected}
            openConnectModal={openConnectModal}
            openMenu={openMenu}
            setOpenConnectModal={setOpenConnectModal}
            setOpenMenu={setOpenMenu}
          />
          {openMenu && (
            <Menu
              address={address!}
              ensName={ensName}
              balance={balance}
              setOpenConnectModal={setOpenConnectModal}
              setOpenMenu={setOpenMenu}
            />
          )}
        </div>
      </div>
    </nav>
  )
}
