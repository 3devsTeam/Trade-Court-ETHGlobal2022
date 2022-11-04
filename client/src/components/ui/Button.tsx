import React from 'react'

interface Props {
  onClick: () => void
  color: string
  icon?: React.ReactNode
  name?: string
  border?: string
  textColor?: string
}

export const Button: React.FC<Props> = ({ onClick, color, icon, border, textColor, name }) => {
  return (
    <button onClick={() => onClick()} className={`${color} ${border} p-2 rounded-xl `}>
      {name ? <span className="font-bold">{name}</span> : null}
      {icon}
    </button>
  )
}
