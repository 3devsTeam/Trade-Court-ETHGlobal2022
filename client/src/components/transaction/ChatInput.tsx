import React, { useState } from 'react'
import { Gram } from '../ui/icons/Gram'

interface Props {
  handleSendMsg: (msg: string) => void
}

export const ChatInput: React.FC<Props> = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState('')

  const sendChat = (event: any) => {
    event.preventDefault()
    handleSendMsg(msg)
  }

  return (
    <form
      onSubmit={(e) => sendChat(e)}
      className="w-full flex items-center gap-2 border-t-2 border-gray-300 px-4">
      <input
        className="w-[90%] bg-transparent text-black"
        type={'text'}
        placeholder="type your message here"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <button className="flex justify-center items-center" type="submit">
        <Gram />
      </button>
    </form>
  )
}
