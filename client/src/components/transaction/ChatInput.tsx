import { DefaultEventsMap } from '@socket.io/component-emitter'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Socket } from 'socket.io-client'
import { ChatServices } from '../../api/chat.services'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Gram } from '../ui/icons/Gram'

interface Props {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
  chatId: string
}

export const ChatInput: React.FC<Props> = ({ socket, chatId }) => {
  const { role, room } = useTypedSelector((state) => state.transactionReducer)

  const [message, setMessage] = useState('')

  const mutation = useMutation(({ message, chatId }: { message: string; chatId: string }) =>
    ChatServices.sendMessageById(chatId, message)
  )

  const sendMessage = () => {
    if (message.trim() != '') {
      socket.emit('send_message', { message, role, room })
      setMessage('')
      mutation.mutate({ message, chatId })
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        sendMessage
      }}
      className="w-full flex items-center gap-2 pr-4">
      {/* <span>{typingStatus ? 'Somebody is typing...' : ''}</span> */}
      <input
        className="w-[90%] h-full bg-transparent text-black pl-4 rounded-[20px] focus:outline-none"
        type={'text'}
        placeholder="Type your message here"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />

      <button type="submit" onClick={sendMessage} className="flex justify-center items-center">
        <Gram />
      </button>
    </form>
  )
}
