import React from 'react'

interface Props {
  disabled?: boolean
  name: string
}

export const SubmitButton = ({ disabled, name }: Props) => {
  return (
    <input
      value={name}
      type="submit"
      disabled={disabled}
      className={`bg-purple rounded-[20px] px-4 py-3 font-bold text-lg text-white transition duration-150 ease-out hover:ease-in cursor-pointer`}
    />
  )
}
