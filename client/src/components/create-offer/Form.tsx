import React from 'react'

interface IForm {
  children: React.ReactNode
}

export const Form = ({ children }: IForm) => {
  return (
    <div className={`flex flex-col gap-5 bg-white break-words rounded-[20px] shadow-lg`}>
      {children}
    </div>
  )
}
