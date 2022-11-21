import React from 'react'

interface Props {
  disabled?: boolean
  name: string
  color?: string
  onClick: () => void
}

export const ButtonDisabled: React.FC<Props> = ({ disabled, name, onClick, color }: Props) => {
  console.log(disabled)
  return (
    <button
      onClick={() => onClick()}
      value={name}
      type="button"
      disabled={disabled}
      className={`${
        disabled
          ? 'border-2 border-gray-300 text-gray-300 cursor-default'
          : 'bg-purple text-white hover:opacity-90 active:scale-105 cursor-pointer'
      } rounded-[15px] py-3 font-bold transition duration-150 ease-out cursor-pointer w-full ${color}`}>
      {name}
    </button>
  )
}
