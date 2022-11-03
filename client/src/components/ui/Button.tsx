import React from 'react'

interface IButtonProps {
  disabled?: boolean
  name: string
  color?: string
  onClick: any
}

export const Button = ({ disabled = false, name, onClick, color }: IButtonProps) => {
  return (
    <button
      style={{
        background: color
      }}
      onClick={() => onClick()}
      value={name}
      type="button"
      disabled={disabled}
      className={`${
        disabled
          ? 'border-2 border-gray-300 text-gray-300 cursor-default'
          : 'bg-purple text-white cursor-pointer'
      } rounded-[20px] px-4 py-3 font-bold text-lg transition duration-150 ease-out hover:ease-in cursor-pointer w-full`}
    >
      {name}
    </button>
  )
}
