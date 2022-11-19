import React from 'react'

interface Props {
  disabled?: boolean
  name: string
  color?: string
  onClick: () => void
}

export const ButtonDisabled: React.FC<Props> = ({
  disabled = false,
  name,
  onClick,
  color
}: Props) => {
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
          : 'bg-purple text-white hover:opacity-90 active:scale-105 cursor-pointer'
      } rounded-[20px] p-4 font-bold text-lg transition duration-150 ease-out cursor-pointer w-full`}>
      {name}
    </button>
  )
}
