import React from 'react'
import { Message } from './Chat'
import { v4 as uuid } from 'uuid'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { truncateAddress } from '../../utils/truncateAddress'

interface Props {
  lastMessageRef: any
  messages: Message[]
}

export const ChatBody: React.FC<Props> = ({ messages, lastMessageRef }) => {
  const { role } = useTypedSelector((state) => state.transactionReducer)

  const fromSelf = 'bg-purple text-white rounded-br-[0px]'
  const otherUser = 'bg-lightGray text-black rounded-bl-[0px]'

  return (
    <>
      {messages.map((message) => (
        <div
          ref={lastMessageRef}
          key={uuid()}
          className={`flex items-center ${
            role === message.role ? 'justify-end' : 'justify-start'
          }`}>
          <div
            className={`${
              role === message.role ? fromSelf : otherUser
            } break-words max-w-[55%] p-[1rem] text-start rounded-[20px]`}>
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </>
  )
}

// ${role === message.role ? fromSelf : otherUser}
