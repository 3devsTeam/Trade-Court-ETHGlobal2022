import React, { useEffect, useRef, useState } from 'react'
import { truncateAddress } from '../../utils/truncateAddress'
import { AvatarIcon } from '../ui/icons/AvatarIcon'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ChatInput } from './ChatInput'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { ChatBody } from './ChatBody'
import { ChatHeader } from './ChatHeader'

interface Props {
  offer: any
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

export interface Message {
  message: string
  role: string
  room: string
}

export const Chat: React.FC<Props> = ({ offer, socket }) => {
  const [messages, setMessages] = useState<Message[]>([])
  console.log(messages)
  const lastMessageRef = useRef<null | HTMLDivElement>()

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data)
      setMessages([...messages, data])
    })
  }, [socket, messages])

  const { role } = useTypedSelector((state) => state.transactionReducer)

  const address =
    role === 'taker' ? offer?.offer?.maker?.address : role === 'maker' ? offer?.taker?.address : ''

  return (
    <div className="grid h-full grid-rows-[15%_75%_10%] gap-[0.1rem] overflow-hidden wrapper">
      <div className="chat-header bg-purple rounded-t-[20px] flex items-center">
        <ChatHeader address={address} offer={offer} />
      </div>
      <div className="chat-messages flex flex-col gap-4 overflow-auto px-[1rem] py-[1rem]">
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
      </div>
      <ChatInput socket={socket} />
    </div>
  )
}
