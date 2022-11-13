import React from 'react'

interface Props {
  name: string
  margin: string
}

export const Divider = ({ name, margin }: Props) => {
  return (
    <div className={`flex items-center ${margin}`}>
      <hr className="w-full" />

      <div className="text-center px-4 flex-none">
        <span className="text-gray-300 select-none">{name}</span>
      </div>

      <hr className="w-full" />
    </div>
  )
}
