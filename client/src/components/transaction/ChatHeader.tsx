import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { truncateAddress } from '../../utils/truncateAddress'
import { AvatarIcon } from '../ui/icons/AvatarIcon'

interface Props {
  offer: any
  address: string
}

export const ChatHeader: React.FC<Props> = ({ offer, address }) => {
  return (
    <>
      <div className="flex gap-2 items-center p-[2rem]">
        <AvatarIcon color={address} />
        <span className="font-bold text-white">{truncateAddress(address)}</span>
      </div>
    </>
  )
}
