import React from 'react'

interface ILabel {
  color: string
  name: string
}

export const Label = ({ color, name }: ILabel) => {
  return (
    <div
      className={`bg-${
        name === 'no taker' ? 'gray' : color
      } absolute -top-3 -left-2 text-white font-bold p-2 rounded-[10px] cursor-default`}
    >
      {name}
    </div>
  )
}
