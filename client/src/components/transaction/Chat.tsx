import React, { useEffect, useRef, useState } from 'react'
import { truncateAddress } from '../../utils/truncateAddress'
import { AvatarIcon } from '../ui/icons/AvatarIcon'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ChatInput } from './ChatInput'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { ChatBody } from './ChatBody'
import { ChatHeader } from './ChatHeader'
import { useQuery } from '@tanstack/react-query'
import { ChatServices } from '../../api/chat.services'

interface Props {
  offer: any
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

export interface Message {
  message: string
  role: string
  room: string
}

export interface lastMessage {
  _id: string
  sender: string
  content: string
  chat: string
  createdAt: string
  updatedAt: string
}

export const Chat: React.FC<Props> = ({ offer, socket }) => {
  const { chatId } = offer

  const [userId, setUserId] = useState('')

  const [lastMessages, setLastMessages] = useState<lastMessage[]>([])

  const { data, isLoading, isError, isSuccess } = useQuery(
    ['get chat'],
    () => ChatServices.getById(chatId),
    {
      select: ({ data }) => data,
      onSuccess: ({ messages, userId }) => {
        setLastMessages(messages)
        setUserId(userId)
      }
    }
  )

  const [messages, setMessages] = useState<Message[]>([])

  const lastMessageRef = useRef<null | HTMLDivElement>()

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    socket.on('receive_message', (data) => {
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
        <ChatBody
          userId={userId}
          lastMessages={lastMessages}
          messages={messages}
          lastMessageRef={lastMessageRef}
        />
      </div>
      <ChatInput chatId={chatId} socket={socket} />
    </div>
  )
}
