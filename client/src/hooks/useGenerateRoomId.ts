import React, { useEffect, useState } from 'react'
import { v4 as uuidv } from 'uuid'

export const useGenerateRoomId = () => {
  const [roomId, setRoomId] = useState(0)

  useEffect(() => {
    setRoomId(parseInt(uuidv().slice(-6)))
  }, [])

  return { roomId }
}
