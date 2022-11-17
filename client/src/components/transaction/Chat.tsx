import React, { useEffect, useRef, useState } from 'react'
import { truncateAddress } from '../../utils/truncateAddress'
import { AvatarIcon } from '../ui/icons/AvatarIcon'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ChatInput } from './ChatInput'

interface IChat {
  offer: any
  socket: any
}

export const Chat = ({ offer, socket }: IChat) => {
  const { role } = useTypedSelector((state) => state.transactionReducer)
  console.log(offer)

  const [messages, setMessages] = useState([])
  const scrollRef = useRef()

  const handleSendMsg = async () => {
    socket.emit()
  }

  const name =
    role === 'taker' ? offer?.offer?.maker?.address : role === 'maker' ? offer?.taker?.address : ''

  return (
    <div className="grid grid-rows-[15%_70%_15%] gap-[0.1rem] overflow-hidden wrapper">
      <div className="chat-header bg-purple rounded-t-[20px] flex items-center">
        <div className="flex gap-2 items-center p-[2rem]">
          <AvatarIcon color={name} />
          <span className="font-bold text-white">{truncateAddress(name)}</span>
        </div>
      </div>
      <div className="chat-messages flex flex-col gap-4 overflow-auto"></div>
      <ChatInput handleSendMsg={() => {}} />
    </div>
  )
}
