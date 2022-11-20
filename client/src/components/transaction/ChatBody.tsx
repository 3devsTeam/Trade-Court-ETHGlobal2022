import React from 'react'
import { lastMessage, Message } from './Chat'
import { v4 as uuid } from 'uuid'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface Props {
  lastMessageRef: any
  messages: Message[]
  lastMessages: lastMessage[]
  userId: string
}

export const ChatBody: React.FC<Props> = ({ userId, messages, lastMessages, lastMessageRef }) => {
  const { role } = useTypedSelector((state) => state.transactionReducer)

  const fromSelf = 'bg-purple text-white rounded-br-[0px]'
  const otherUser = 'bg-lightGray text-black rounded-bl-[0px]'

  return (
    <>
      {lastMessages.length
        ? lastMessages.map((message) => (
            <div
              ref={lastMessageRef}
              key={uuid()}
              className={`flex items-center ${
                message.sender === userId ? 'justify-end' : 'justify-start'
              }`}>
              <div
                className={`${
                  message.sender === userId ? fromSelf : otherUser
                } break-words max-w-[55%] p-[1rem] text-start rounded-[20px]`}>
                <p>{message.content}</p>
              </div>
            </div>
          ))
        : null}
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
