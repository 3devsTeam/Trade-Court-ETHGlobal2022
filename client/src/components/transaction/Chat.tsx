import React, { useEffect, useRef, useState } from 'react'
import { truncateAddress } from '../../utils/truncateAddress'
import { AvatarIcon } from '../ui/icons/AvatarIcon'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ChatInput } from './ChatInput'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { v4 as uuid } from 'uuid'

interface Props {
  offer: any
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

interface Message {
  message: string
  role: string
  room: string
}

export const Chat: React.FC<Props> = ({ offer, socket }) => {
  const { role } = useTypedSelector((state) => state.transactionReducer)

  const [messages, setMessages] = useState<Message[]>([])
  const lastMessageRef = useRef(null)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    socket.on('message_recieved', (data) => setMessages([...messages, data]))
  }, [socket, messages])

  console.log(messages)

  const name =
    role === 'taker' ? offer?.offer?.maker?.address : role === 'maker' ? offer?.taker?.address : ''

  const fromSelf = 'bg-green justify-self-start text-white'
  const otherUser = 'bg-purple justify-self-end text-white'

  return (
    <div className="grid h-full grid-rows-[15%_75%_10%] gap-[0.1rem] overflow-hidden wrapper">
      <div className="chat-header bg-purple rounded-t-[20px] flex items-center">
        <div className="flex gap-2 items-center p-[2rem]">
          <AvatarIcon color={name} />
          <span className="font-bold text-white">{truncateAddress(name)}</span>
        </div>
      </div>
      <div className="chat-messages flex flex-col gap-4 overflow-auto px-[1rem] py-[2rem]">
        {messages.map((message) => (
          <div ref={lastMessageRef} key={uuid()}>
            <div className={`flex items-center`}>
              <div
                className={`break-words w-[50%] p-[1rem] text-start rounded-[20px] ${
                  role === message.role ? fromSelf : otherUser
                }`}>
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput socket={socket} />
    </div>
  )
}
