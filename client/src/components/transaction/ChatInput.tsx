import { DefaultEventsMap } from '@socket.io/component-emitter'
import React, { useState } from 'react'
import { Socket } from 'socket.io-client'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Gram } from '../ui/icons/Gram'

interface Props {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
  // handleSendMsg: (msg: string) => void
}

export const ChatInput: React.FC<Props> = ({ socket }) => {
  const { role, room } = useTypedSelector((state) => state.transactionReducer)

  const [message, setMessage] = useState('')

  const sendMessage = () => {
    socket.emit('send_message', { message, role, room })
    setMessage('')
  }

  return (
    <div className="w-full flex items-center gap-2 rounded-[20px] border-2 border-gray-300">
      <input
        className="w-[90%] h-full bg-transparent text-black pl-4 rounded-[20px] focus:outline-none"
        type={'text'}
        placeholder="Type your message here"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button onClick={sendMessage} className="flex justify-center items-center">
        <Gram />
      </button>
    </div>
  )
}
