import React from 'react'

interface Props {
  onClick: () => void
  children: React.ReactNode
}

export const SelectButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex border justify-center items-center rounded-lg p-3 hover:shadow-customDark transition-all duration-500">
      {children}
    </button>
  )
}
